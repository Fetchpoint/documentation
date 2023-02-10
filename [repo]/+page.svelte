<h3>{data.repo}</h3>
<p>Incomplete documentation endpoint.</p>
<p class="_subtle">Missing: repo/[version]/[focus]</p>

<div class="_row">
    <Button on:click="{()=>goto('/documentation')}">
        <Icon name="arrow_back"/>
        <p>Documentation home</p>
    </Button>
</div>

<script lang="ts">
    import Icon from "src/components/Icon.svelte";
    import Button from "src/components/Button.svelte";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    export let data:any = "";
</script>