(() => {
  const SKUS = ['d100', 'd550', 'd1200', 'vip30'];
  const getPlugin = () =>
    (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.NativePurchases) || null;

  let _supported = false;
  let _initPromise = null;
  let _products = {};
  let _getSession = null;
  let _getApiBase = null;
  let _onNotice = null;
  let _busy = false;
  let _recovering = false;

  const isSupported = () => _supported;
  const getPrice = (sku) => (_products[sku] && _products[sku].priceString) || '';

  async function confirmOnWorker(sku, purchaseToken, purchaseState) {
    const sess = _getSession ? _getSession() : null;
    const base = _getApiBase ? _getApiBase() : '';
    if (!sess || !sess.code || !sess.sessao || !base) return { ok: false, erro: 'sessao' };
    try {
      const r = await fetch(`${base}/pagamento/play`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: sess.code,
          sessao: sess.sessao,
          pacote: sku,
          purchaseToken,
          purchaseState: purchaseState != null ? String(purchaseState) : '1',
        }),
      });
      const data = await r.json().catch(() => ({ erro: 'rede' }));
      return r.ok && data && data.ok ? data : { ok: false, erro: (data && data.erro) || 'falha' };
    } catch {
      return { ok: false, erro: 'rede' };
    }
  }

  async function finishPurchase(pl, token) {
    if (!token) return;
    // Todos os 4 SKUs (d100, d550, d1200, vip30) são consumíveis/recompráveis;
    // só consumimos depois que o Worker confirmou o crédito.
    await pl.consumePurchase({ purchaseToken: token });
  }

  async function recover() {
    if (!_supported || _recovering) return;
    const pl = getPlugin();
    const sess = _getSession ? _getSession() : null;
    if (!pl || !sess || !sess.code || !sess.sessao || sess.visitante) return;
    _recovering = true;
    try {
      const { purchases } = await pl.getPurchases({ productType: 'inapp' });
      for (const p of purchases || []) {
        const sku = p && p.productIdentifier;
        const token = p && p.purchaseToken;
        if (!SKUS.includes(sku) || !token) continue;
        if (String(p.purchaseState) !== '1') continue;
        const res = await confirmOnWorker(sku, token, '1');
        if (res && res.ok) {
          await finishPurchase(pl, token).catch(() => {});
          if (!res.repetido && _onNotice) {
            _onNotice('Compra confirmada! Seu saldo foi atualizado.');
          }
        }
      }
    } catch {
      // Silencioso: tentará novamente na próxima abertura
    } finally {
      _recovering = false;
    }
  }

  async function init(getSession, getApiBase, onNotice) {
    if (getSession) _getSession = getSession;
    if (getApiBase) _getApiBase = getApiBase;
    if (onNotice) _onNotice = onNotice;
    if (_initPromise) {
      await _initPromise;
      if (_supported) recover();
      return _supported;
    }
    _initPromise = (async () => {
      const pl = getPlugin();
      if (!pl) return false;
      try {
        const { isBillingSupported } = await pl.isBillingSupported();
        if (!isBillingSupported) return false;
        _supported = true;
        try {
          const { products } = await pl.getProducts({
            productIdentifiers: SKUS,
            productType: 'inapp',
          });
          for (const p of products || []) {
            if (p && p.identifier) _products[p.identifier] = p;
          }
        } catch {
          // Produtos podem ainda não estar publicados no Console
        }
        await recover();
        return true;
      } catch {
        _supported = false;
        return false;
      }
    })();
    return _initPromise;
  }

  async function buy(sku) {
    if (!SKUS.includes(sku)) return { ok: false, erro: 'pacote' };
    if (!_supported) await init(_getSession, _getApiBase, _onNotice);
    if (!_supported) return { fallbackWeb: true };
    const pl = getPlugin();
    if (!pl) return { fallbackWeb: true };
    if (_busy) return { ok: false, cancelado: true };
    _busy = true;
    try {
      const r = await pl.purchaseProduct({
        productIdentifier: sku,
        productType: 'inapp',
        quantity: 1,
        isConsumable: false,
        autoAcknowledgePurchases: false,
      });
      if (r && r.purchaseState != null && String(r.purchaseState) !== '1') {
        if (_onNotice) {
          _onNotice('Pagamento pendente. Assim que a Google Play confirmar, o saldo entra automaticamente.');
        }
        return { ok: false, pendente: true };
      }
      const token = r && r.purchaseToken;
      if (!token) return { ok: false, erro: 'token' };
      const res = await confirmOnWorker(sku, token, '1');
      if (res && res.ok) {
        await finishPurchase(pl, token).catch(() => {});
        return { ok: true, repetido: !!res.repetido };
      }
      return { ok: false, erro: (res && res.erro) || 'falha' };
    } catch (e) {
      const msg = String((e && (e.code || e.message)) || e || '');
      if (/cancel/i.test(msg)) return { ok: false, cancelado: true };
      return { ok: false, erro: 'falha' };
    } finally {
      _busy = false;
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && _supported) recover();
  });

  window.MesaPlayBilling = {
    SKUS,
    supported: isSupported,
    init,
    getPrice,
    buy,
    recover,
  };
})();
