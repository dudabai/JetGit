<script lang="ts">
	import StatusBar from "$lib/jetgit/components/StatusBar.svelte";
	import TabPanel from "$lib/jetgit/components/TabPanel.svelte";
	import Tabs from "$lib/jetgit/components/Tabs.svelte";
	import ToolWindow from "$lib/jetgit/tool-window/ToolWindow.svelte";
	import ToolWindowHost from "$lib/jetgit/tool-window/ToolWindowHost.svelte";
	import { useToolWindowManager } from "$lib/jetgit/tool-window/toolWindowManager.svelte";

	const manager = useToolWindowManager();

	// Register the default "Git" tool window
	$effect(() => {
		manager.register({
			id: "git",
			title: "Git",
			icon: "⎇",
			anchor: "left",
			visible: true,
			order: 0,
		});
	});

	let activeTab = $state("log");
	const tabs = [
		{ id: "log", label: "Log" },
		{ id: "changes", label: "Local Changes" },
		{ id: "console", label: "Console" },
	];
</script>

<!-- Import Darcula theme and JetBrains Mono font -->
<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.2.8/index.css"
	/>
</svelte:head>

<div class="jetgit-root" data-theme="darcula">
	<div class="jetgit-topbar">
		<span class="jetgit-topbar-title">JetGit</span>
		<a href="/" class="jetgit-back-link">← Back to GitButler</a>
	</div>

	<div class="jetgit-workspace">
		<ToolWindowHost>
			{#snippet leftContent()}
				<ToolWindow id="git" title="Git" icon="⎇">
					<Tabs {tabs} bind:activeTab />
					<TabPanel id="log" {activeTab}>
						<div class="jetgit-placeholder">
							<p>🪵 Git Log will be implemented in PR #2</p>
						</div>
					</TabPanel>
					<TabPanel id="changes" {activeTab}>
						<div class="jetgit-placeholder">
							<p>📝 Local Changes will be implemented in PR #3</p>
						</div>
					</TabPanel>
					<TabPanel id="console" {activeTab}>
						<div class="jetgit-placeholder jetgit-console">
							<p>$ Git command output will appear here</p>
						</div>
					</TabPanel>
				</ToolWindow>
			{/snippet}

			<div class="jetgit-center-placeholder">
				<p>Select a file or commit to view details here.</p>
			</div>
		</ToolWindowHost>
	</div>

	<StatusBar message="JetGit ready" />
</div>

<style>
	/*
	 * Darcula theme CSS variables are inlined here because packages/ui-jetbrains
	 * is not yet published as a built package.
	 * Once the package is built and added to @gitbutler/desktop dependencies,
	 * replace this block with:  @import "@jetgit/ui-jetbrains/themes/darcula.css";
	 * The authoritative source of truth is packages/ui-jetbrains/themes/darcula.css.
	 */
	:global([data-theme="darcula"]) {
		--jb-bg-primary: #2b2b2b;
		--jb-bg-secondary: #313335;
		--jb-bg-tool-window: #3c3f41;
		--jb-bg-elevated: #45484a;
		--jb-bg-input: #1e1e1e;
		--jb-bg-hover: rgba(255, 255, 255, 0.07);
		--jb-bg-active: rgba(75, 110, 175, 0.4);
		--jb-bg-selection: #214283;
		--jb-fg-primary: #bbbbbb;
		--jb-fg-secondary: #808080;
		--jb-fg-disabled: #606060;
		--jb-fg-link: #5c94ce;
		--jb-fg-on-accent: #ffffff;
		--jb-border-color: #555555;
		--jb-border-focused: #6897bb;
		--jb-border-subtle: #434648;
		--jb-accent: #4b6eaf;
		--jb-accent-hover: #5c7ebd;
		--jb-accent-active: #3b5e9e;
		--jb-success: #499c54;
		--jb-warning: #e2c22e;
		--jb-error: #c75450;
		--jb-info: #6897bb;
		--jb-tool-window-header-bg: #3c3f41;
		--jb-tool-window-header-fg: #bbbbbb;
		--jb-tool-window-header-height: 28px;
		--jb-tool-window-bar-width: 28px;
		--jb-tab-bg: #3c3f41;
		--jb-tab-fg: #a9b7c6;
		--jb-tab-bg-active: #4b6eaf;
		--jb-tab-fg-active: #ffffff;
		--jb-tab-bg-hover: #4c5052;
		--jb-tab-height: 28px;
		--jb-tab-border-radius: 2px;
		--jb-font-family: "JetBrains Mono", "Cascadia Code", "Fira Code", monospace;
		--jb-font-size: 13px;
		--jb-font-size-sm: 11px;
		--jb-line-height: 1.5;
		--jb-radius-sm: 2px;
		--jb-radius: 4px;
		--jb-transition: 150ms ease;
		--jb-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
	}

	.jetgit-root {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background: var(--jb-bg-primary, #2b2b2b);
		color: var(--jb-fg-primary, #bbb);
		font-size: var(--jb-font-size, 13px);
		font-family: var(--jb-font-family, monospace);
	}

	.jetgit-topbar {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: space-between;
		height: 36px;
		padding: 0 12px;
		border-bottom: 1px solid var(--jb-border-color, #555);
		background: var(--jb-bg-secondary, #313335);
	}

	.jetgit-topbar-title {
		color: var(--jb-fg-primary, #bbb);
		font-weight: 700;
		font-size: 14px;
		letter-spacing: 0.05em;
	}

	.jetgit-back-link {
		color: var(--jb-fg-link, #5c94ce);
		font-size: var(--jb-font-size-sm, 11px);
		text-decoration: none;
	}

	.jetgit-back-link:hover {
		text-decoration: underline;
	}

	.jetgit-workspace {
		display: flex;
		flex: 1;
		overflow: hidden;
	}

	.jetgit-center-placeholder {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		padding: 24px;
		color: var(--jb-fg-secondary, #808080);
		font-size: var(--jb-font-size-sm, 11px);
		text-align: center;
	}

	.jetgit-placeholder {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		padding: 16px;
		color: var(--jb-fg-secondary, #808080);
		font-size: var(--jb-font-size-sm, 11px);
		text-align: center;
	}

	.jetgit-console {
		align-items: flex-start;
		justify-content: flex-start;
		border-top: 1px solid var(--jb-border-color, #555);
		background: var(--jb-bg-input, #1e1e1e);
		font-family: var(--jb-font-family, monospace);
	}
</style>
