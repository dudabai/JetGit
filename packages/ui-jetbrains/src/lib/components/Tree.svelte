<script lang="ts" module>
	export interface TreeNode {
		/** Unique key for this node */
		id: string;
		/** Display label */
		label: string;
		/** Icon character or SVG string (optional) */
		icon?: string;
		/** Child nodes */
		children?: TreeNode[];
	}

	/** Props for the minimal JetBrains-style Tree component */
	export interface Props {
		/** Root nodes to display */
		nodes: TreeNode[];
		/** Currently selected node id */
		selectedId?: string;
		/** Fired when a node is selected */
		onSelect?: (id: string) => void;
		/** Depth for indentation (internal use) */
		depth?: number;
	}
</script>

<script lang="ts">
	import Tree from "./Tree.svelte";

	let { nodes, selectedId = $bindable(""), onSelect, depth = 0 }: Props = $props();

	let expanded = $state<Record<string, boolean>>({});

	function toggle(id: string) {
		expanded[id] = !expanded[id];
	}

	function select(id: string) {
		selectedId = id;
		onSelect?.(id);
	}
</script>

<ul class="jb-tree" class:root={depth === 0} style:padding-left={depth === 0 ? "0" : "14px"}>
	{#each nodes as node (node.id)}
		{@const hasChildren = node.children && node.children.length > 0}
		{@const isExpanded = expanded[node.id] ?? false}
		<li class="jb-tree-item">
			<button
				type="button"
				class={["jb-tree-row", selectedId === node.id && "selected"]}
				onclick={() => {
					select(node.id);
					if (hasChildren) toggle(node.id);
				}}
			>
				{#if hasChildren}
					<span class="jb-tree-arrow" class:open={isExpanded}>▶</span>
				{:else}
					<span class="jb-tree-leaf-indent"></span>
				{/if}
				{#if node.icon}
					<span class="jb-tree-icon">{node.icon}</span>
				{/if}
				<span class="jb-tree-label">{node.label}</span>
			</button>
			{#if hasChildren && isExpanded}
				<Tree nodes={node.children ?? []} {selectedId} {onSelect} depth={depth + 1} />
			{/if}
		</li>
	{/each}
</ul>

<style>
	.jb-tree {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.jb-tree-item {
		display: flex;
		flex-direction: column;
	}

	.jb-tree-row {
		display: flex;
		align-items: center;
		width: 100%;
		height: 22px;
		padding: 0 4px;
		overflow: hidden;
		gap: 4px;
		border: none;
		border-radius: 0;
		background: transparent;
		color: var(--jb-fg-primary, #bbb);
		font-size: var(--jb-font-size, 13px);
		font-family: var(--jb-font-family, monospace);
		text-align: left;
		white-space: nowrap;
		cursor: pointer;
		transition: background var(--jb-transition, 150ms ease);
	}

	.jb-tree-row:hover {
		background: var(--jb-bg-hover, rgba(255, 255, 255, 0.07));
	}

	.jb-tree-row.selected {
		background: var(--jb-bg-selection, #214283);
		color: var(--jb-fg-on-accent, #fff);
	}

	.jb-tree-arrow {
		display: inline-flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: 12px;
		font-size: 8px;
		opacity: 0.7;
		transition: transform var(--jb-transition, 150ms ease);
	}

	.jb-tree-arrow.open {
		transform: rotate(90deg);
	}

	.jb-tree-leaf-indent {
		flex-shrink: 0;
		width: 12px;
	}

	.jb-tree-icon {
		flex-shrink: 0;
	}

	.jb-tree-label {
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
