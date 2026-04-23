<script lang="ts" module>
	export interface Tab {
		/** Unique identifier for the tab */
		id: string;
		/** Display label */
		label: string;
		/** Whether the tab is disabled */
		disabled?: boolean;
	}

	/** Props for the JetBrains-style Tabs component */
	export interface Props {
		/** List of tabs to display */
		tabs: Tab[];
		/** Currently active tab id */
		activeTab?: string;
		/** Fired when the user selects a tab */
		onTabChange?: (id: string) => void;
	}
</script>

<script lang="ts">
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
			aria-disabled={tab.disabled}
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
		align-items: center;
		overflow-x: auto;
		gap: 0;
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
