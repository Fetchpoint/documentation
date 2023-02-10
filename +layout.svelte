<PageNav>
    <nav slot="left">
        <h2>Documentation</h2>
        {#if data.length}
            {#each data as [n,d]}
                <NavItem name="{n}" data="{d}" url="{n}"/>
            {/each}
        {:else} 
            <p>getting nav</p>
        {/if}
    </nav>
    <div slot="right">
        <slot/>
    </div>
</PageNav>

<script lang="ts">
    import NavItem from "src/components/NavItem.svelte";
    import PageNav from "src/components/PageNav.svelte";
    import { onMount } from "svelte";
    import type { mdtree } from "./list/+server";
    import { G } from "src/fetch";

    let data:any = [];

    onMount(async ()=>{
        G('/documentation/list/',{}).then(e=>{
            e.json().then(json=>{
                data = Object.entries(json);
            }).catch(e=>{throw e})
        }).catch(e=>{throw e});
    })


    let navs = [
        {icon:'api',name:'REST'},
        {icon:'data_object',name:'NodeJS'},
    ]
</script>