<PageNav>
    <nav slot="left">
        <h2>Documentation</h2>
        {#if tree}
            <div class="slideup">
                {#each Object.entries(tree) as [n,d]}
                    <NavItem name="{n}" data="{d}" url="{n}" on:open="{(d)=>{open(d.detail)}}"/>
                {/each}
            </div>
        {:else} 
            <div class="slideup">
                <p>getting nav</p>

            </div>
        {/if}
    </nav>
    <div slot="right">
        <slot/>
        {#if markdown}
            {@html marked.parse(markdown)}
        {/if}
    </div>
</PageNav>

<script lang="ts">
    import NavItem from "src/components/NavItem.svelte";
    import PageNav from "src/components/PageNav.svelte";
    import { beforeUpdate, onMount } from "svelte";
    import { G } from "src/fetch";
    import { marked } from "marked";
    import type { mdtree } from "./list/+server";
    import {page} from "$app/stores"

    let tree:mdtree;
    let markdown:string = '';
    let imports:any = {};

    onMount(async ()=>{
        G('/docs/list/',{}).then(e=>{
            e.json().then(json=>{
                tree = json.list;
                imports = json.files;
                updateMarkdown()
            }).catch(e=>{throw e})
        }).catch(e=>{throw e});
    })

    beforeUpdate(async ()=>{
        if(imports){
            updateMarkdown()
        }
    })

    function updateMarkdown(){
        let chain = [$page.params.repo];
        if($page.params.version) chain.push($page.params.version);
        if($page.params.focus) chain.push($page.params.focus || 'index.md');
        if(imports[`/md/${chain.join('/')}`]){
            markdown = imports[`/md/${chain.join('/')}`].html;
        }
    }
</script>

<style lang="scss">

    @keyframes rowEnter {
        from{
            transform: translate3d(0px,0.5em,0px);
            opacity: 0;
        }
    }
    .slideup{
        animation: rowEnter 0.15s $bezier;
    }
</style>