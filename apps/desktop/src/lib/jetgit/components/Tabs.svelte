<script lang="ts">
	interface Tab {
		id: string;
		label: string;
		disabled?: boolean;
	}

	interface Props {
		tabs: Tab[];
		activeTab?: string;
		onTabChange?: (id: string) => void;
	}

	let { tabs, activeTab = $bindable(""), onTabChange }: Props = $props();

	function selectTab(id: string) {
		activeTab = id;
		onTabChange?.(id);
	}
</script>

<div class="jb-tabs" role="tablist">
	{#each tabs as tab (tab.id)}
		<button
			type="button"
			role="tab"
			aria-selected={activeTab === tab.id}
			disabled={tab.disabled}
			class={["jb-tab", activeTab === tab.id && "active"]}
			onclick={() => !tab.disabled && selectTab(tab.id)}
		>
			{tab.label}
		</button>
	{/each}
</div>

<style>
	.jb-tabs {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		overflow-x: auto;
		border-bottom: 1px solid var(--jb-border-color, #555);
		background: var(--jb-tab-bg, #3c3f41);
		scrollbar-width: none;
	}

	.jb-tabs::-webkit-scrollbar {
		display: none;
	}

	.jb-tab {
		display: inline-flex;
		align-items: center;
		height: var(--jb-tab-height, 28px);
		padding: 0 12px;
		border: none;
		border-bottom: 2px solid transparent;
		background: transparent;
		color: var(--jb-tab-fg, #a9b7c6);
		font-size: var(--jb-font-size, 13px);
		font-family: var(--jb-font-family, monospace);
		white-space: nowrap;
		cursor: pointer;
		transition:
			color var(--jb-transition, 150ms ease),
			border-color var(--jb-transition, 150ms ease),
			background var(--jb-transition, 150ms ease);
	}

	.jb-tab:hover:not(:disabled) {
		background: var(--jb-tab-bg-hover, #4c5052);
		color: var(--jb-fg-primary, #bbb);
	}

	.jb-tab.active {
		border-bottom-color: var(--jb-accent, #4b6eaf);
		color: var(--jb-fg-primary, #bbb);
	}

	.jb-tab:disabled {
		cursor: not-allowed;
		opacity: 0.4;
	}
</style>
