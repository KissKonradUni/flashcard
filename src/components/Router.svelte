<script lang="ts">
    import { getCurrentRoute, onRouteChange } from '../Router';

    let CurrentRoute = $state(getCurrentRoute());
    let CurrentComponent: typeof CurrentRoute.component = $derived(CurrentRoute?.component);
    let CurrentTitle: string = $derived(CurrentRoute?.title || '*');
    
    type PropsType = (typeof CurrentRoute) extends { component: infer C } ? C extends { $$prop_def: infer P } ? P : {} : {};
    let CurrentProps: PropsType = $derived(CurrentRoute?.props || {});
    
    let animation: number | null = null;
    
    onRouteChange((route) => {
        if (CurrentRoute.href == route.href) {
            return; 
        }

        if (animation) {
            clearTimeout(animation);
        }

        document.getElementById('current-page')!.classList.add('fade-out');

        animation = setTimeout(() => {
            CurrentRoute = route;

            document.getElementById('current-page')!.classList.remove('fade-out');
        }, 100);
    });
</script>

<svelte:head>
    <title>Flash cards - {CurrentTitle}</title>
</svelte:head>

<CurrentComponent {...CurrentProps}>
</CurrentComponent>
