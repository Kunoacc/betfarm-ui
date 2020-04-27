class GlobalComponents {

    constructor(instance){
        this.vue = instance;
    }

    register() {
        const components = require.context('@/components', false, /[A-Z]\w+\.(vue)$/);
        const keys = components.keys();
        keys.forEach((fileName) => {
            const componentConfig = components(fileName);
            const componentName = fileName.split('/').pop().split('.')[0];
            this.vue.component(componentName, componentConfig.default || componentConfig);
        });
    }

}

export default GlobalComponents;