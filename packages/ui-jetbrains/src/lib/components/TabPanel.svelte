<script lang="ts" module>
	/** Props for the JetBrains-style TabPanel component */
	export interface Props {
		/** The tab id this panel is associated with */
		id: string;
		/** The currently active tab id */
		activeTab: string;
		/** Panel content */
		children?: import("svelte").Snippet;
	}
</script>

<script lang="ts">
	let { id, activeTab, children }: Props = $props();
	const isActive = $derived(activeTab === id);
</script>

{#if isActive}
	<div class="jb-tab-panel" role="tabpanel" aria-labelledby={id}>
		{#if children}
			{@render children()}
		{/if}
	</div>
{/if}

<style>
	.jb-tab-panel {
		display: flex;
		flex: 1;
		flex-direction: column;
		padding: 8px;
		overflow: hidden;
		color: var(--jb-fg-primary, #bbb);
		font-size: var(--jb-font-size, 13px);
		font-family: var(--jb-font-family, monospace);
	}
</style>
