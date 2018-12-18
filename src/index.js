function init() {
    require('./init-app');
}

if (!('customElements' in document)) {
    import('@webcomponents/custom-elements').then(init);
} else {
    init();
}
