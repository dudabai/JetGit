# JetGit Frontend – `apps/desktop/src/lib/jetgit/`

JetBrains IDEA-style Git tool-window UI layer for JetGit.
All code here is **additive** — it does not modify any existing GitButler source files.

## Directory Structure

```
apps/desktop/src/lib/jetgit/
├── components/               # Local UI primitives used by /jetgit route
│   ├── StatusBar.svelte      # Bottom status bar (branch name, messages)
│   ├── TabPanel.svelte       # Conditionally-rendered tab content panel
│   └── Tabs.svelte           # Tab bar with active indicator
└── tool-window/              # Tool window docking framework
    ├── ToolWindow.svelte     # Single dockable window container (resizable)
    ├── ToolWindowBar.svelte  # Vertical icon bar for toggling tool windows
    ├── ToolWindowHost.svelte # Master layout: left/right/bottom + center
    └── toolWindowManager.svelte.ts  # Svelte 5 runes global state
```

## Tool Window Manager

The `toolWindowManager.svelte.ts` module exposes a singleton via `useToolWindowManager()`.
Dimensions and visibility are persisted to `localStorage` under the key `jetgit:tool-windows`.

```ts
import { useToolWindowManager } from "$lib/jetgit/tool-window/toolWindowManager.svelte";

const manager = useToolWindowManager();

// Register a window
manager.register({ id: "git", title: "Git", icon: "⎇", anchor: "left", visible: true, order: 0 });

// Toggle visibility
manager.toggle("git");

// Change dock position
manager.setAnchor("git", "bottom");

// Resize (called from drag handler)
manager.setSize("git", 320, 240);
```

## Adding a New Tool Window

1. Register your window in the page/layout that owns it:

```svelte
<script>
	import { useToolWindowManager } from "$lib/jetgit/tool-window/toolWindowManager.svelte";
	const manager = useToolWindowManager();
	manager.register({ id: "my-tool", title: "My Tool", anchor: "right", visible: true, order: 1 });
</script>
```

2. Render it inside `ToolWindowHost`'s `rightContent` snippet:

```svelte
<ToolWindowHost>
	{#snippet rightContent()}
		<ToolWindow id="my-tool" title="My Tool">
			<!-- content here -->
		</ToolWindow>
	{/snippet}
</ToolWindowHost>
```

## Svelte 5 Runes Convention

All components in this directory **must** use Svelte 5 runes syntax:

- `$state()` for reactive local state
- `$derived()` / `$derived.by()` for computed values
- `$effect()` for side effects
- `$props()` for component props

Do **not** use the legacy `$:` reactive syntax.

## Extension Guide

Follow this sequence when building new JetGit features:

1. **PR #2 – Git Log**: Render commit list in `log` tab using `gitbutler_list_branches` or similar
   Tauri command. Add DAG graph visualization as a follow-up.
2. **PR #3 – Local Changes**: Show uncommitted file changes in `changes` tab.
   Integrate with existing `WORKTREE_SERVICE`.
3. **PR #4 – Diff Viewer**: Two-pane or unified diff in the center area.
4. **PR #5 – Branches Popup**: Floating branch list with checkout/merge actions.
5. **PR #6 – Commit Window**: Left file tree + commit message editor + push button.
6. **PR #7 – Merge Conflicts**: Three-pane resolver.
