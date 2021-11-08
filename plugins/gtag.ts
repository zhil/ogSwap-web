import Vue from 'vue';
import VueGtag from 'vue-gtag';

export default ({ app }: {app: any}) => {
    Vue.use(VueGtag, {
        config: { id: 'G-6V6CBJ82RC' },
        appName: 'OG Swap',
        pageTrackerScreenviewEnabled: true
    }, app.router);
}