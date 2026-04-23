# @jetgit/ui-jetbrains

JetBrains-style UI component library for JetGit, the IDEA-inspired Git desktop client built on GitButler.

## Theme

Import the Darcula theme CSS variables in your root layout:

```html
<link rel="stylesheet" href="node_modules/@jetgit/ui-jetbrains/themes/darcula.css" />
```

Or via JavaScript/TypeScript import:

```ts
import "@jetgit/ui-jetbrains/themes/darcula.css";
```

Apply the `data-theme="darcula"` attribute to the root element to activate the theme:

```html
<div data-theme="darcula"><!-- app content --></div>
```

## Font

This package includes [`@fontsource/jetbrains-mono`](https://www.npmjs.com/package/@fontsource/jetbrains-mono).
Import it in your entry point:

```ts
import "@fontsource/jetbrains-mono";
```

Or via CDN in `<svelte:head>`:

```html
<link
	rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.2.8/index.css"
/>
```

## Components

All components use **Svelte 5 runes** syntax.

| Component    | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| `Button`     | Standard button with `primary`, `secondary`, `ghost` variants |
| `IconButton` | Square icon-only button with active/hover states              |
| `Tabs`       | Tab bar — fires `onTabChange` with the selected tab id        |
| `TabPanel`   | Shows/hides content based on `activeTab` matching `id`        |
| `Tree`       | Minimal collapsible tree view                                 |
| `Popup`      | Centered modal dialog with header, body, and footer           |
| `StatusBar`  | Bottom status bar with left/center/right sections             |

### Button

```svelte
<script>
	import { Button } from "@jetgit/ui-jetbrains";
</script>

<Button variant="primary" onclick={() => console.warn("clicked")}>Commit</Button>
<Button variant="secondary" label="Fetch" />
<Button variant="ghost" disabled>Cancel</Button>
```

### IconButton

```svelte
<script>
	import { IconButton } from "@jetgit/ui-jetbrains";
</script>

<IconButton label="Refresh" onclick={refresh}>⟳</IconButton>
```

### Tabs + TabPanel

```svelte
<script>
	import { Tabs, TabPanel } from "@jetgit/ui-jetbrains";
	let activeTab = $state("log");
	const tabs = [
		{ id: "log", label: "Log" },
		{ id: "changes", label: "Local Changes" },
	];
</script>

<Tabs {tabs} bind:activeTab />
<TabPanel id="log" {activeTab}>Git log content here</TabPanel>
<TabPanel id="changes" {activeTab}>Changes content here</TabPanel>
```

### Tree

```svelte
<script>
	import { Tree } from "@jetgit/ui-jetbrains";
	const nodes = [
		{
			id: "src",
			label: "src",
			children: [{ id: "main.ts", label: "main.ts" }],
		},
	];
	let selectedId = $state("");
</script>

<Tree {nodes} bind:selectedId onSelect={(id) => console.warn(id)} />
```

### Popup

```svelte
<script>
	import { Popup, Button } from "@jetgit/ui-jetbrains";
	let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open</Button>
<Popup {open} title="Confirm" onClose={() => (open = false)}>
	Are you sure?
	{#snippet footer()}
		<Button variant="primary" onclick={() => (open = false)}>Yes</Button>
		<Button onclick={() => (open = false)}>No</Button>
	{/snippet}
</Popup>
```

### StatusBar

```svelte
<script>
	import { StatusBar } from "@jetgit/ui-jetbrains";
</script>

<StatusBar branch="main" message="All changes committed" />
```

## CSS Variables Reference

See [`themes/darcula.css`](./themes/darcula.css) for the full list of CSS custom properties.
Key variables:

| Variable              | Default        | Usage                  |
| --------------------- | -------------- | ---------------------- |
| `--jb-bg-primary`     | `#2b2b2b`      | Main background        |
| `--jb-bg-secondary`   | `#313335`      | Panel / sidebar bg     |
| `--jb-bg-tool-window` | `#3c3f41`      | Tool window bg         |
| `--jb-fg-primary`     | `#bbbbbb`      | Primary text           |
| `--jb-accent`         | `#4b6eaf`      | Selection / focus blue |
| `--jb-border-color`   | `#555555`      | Default border         |
| `--jb-font-family`    | JetBrains Mono | UI font                |
