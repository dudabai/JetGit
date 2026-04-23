/**
 * JetGit Tool Window Manager
 *
 * Global state for managing tool window docking positions, visibility, and dimensions.
 * Uses Svelte 5 runes for reactivity; dimensions are persisted to localStorage.
 */

export type ToolWindowAnchor = "left" | "right" | "bottom" | "float";

export interface ToolWindowState {
	id: string;
	title: string;
	icon?: string;
	anchor: ToolWindowAnchor;
	visible: boolean;
	width: number;
	height: number;
	order: number;
}

const STORAGE_KEY = "jetgit:tool-windows";

function loadFromStorage(): Record<string, Partial<ToolWindowState>> {
	if (typeof window === "undefined") return {};
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as Record<string, Partial<ToolWindowState>>) : {};
	} catch (err) {
		console.error("Failed to load JetGit tool window state from localStorage:", err);
		return {};
	}
}

function saveToStorage(windows: Record<string, ToolWindowState>) {
	if (typeof window === "undefined") return;
	const persisted: Record<string, Partial<ToolWindowState>> = {};
	for (const [id, win] of Object.entries(windows)) {
		persisted[id] = {
			anchor: win.anchor,
			visible: win.visible,
			width: win.width,
			height: win.height,
		};
	}
	localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
}

function createToolWindowManager() {
	const persisted = loadFromStorage();

	const windows = $state<Record<string, ToolWindowState>>({});

	function register(
		initial: Omit<ToolWindowState, "width" | "height"> & { width?: number; height?: number },
	) {
		const saved = persisted[initial.id] ?? {};
		windows[initial.id] = {
			width: 280,
			height: 220,
			...initial,
			...saved,
		};
	}

	function setAnchor(id: string, anchor: ToolWindowAnchor) {
		if (windows[id]) {
			windows[id].anchor = anchor;
			saveToStorage(windows);
		}
	}

	function setVisible(id: string, visible: boolean) {
		if (windows[id]) {
			windows[id].visible = visible;
			saveToStorage(windows);
		}
	}

	function toggle(id: string) {
		if (windows[id]) {
			windows[id].visible = !windows[id].visible;
			saveToStorage(windows);
		}
	}

	function setSize(id: string, width: number, height: number) {
		if (windows[id]) {
			windows[id].width = Math.max(100, width);
			windows[id].height = Math.max(80, height);
			saveToStorage(windows);
		}
	}

	function getByAnchor(anchor: ToolWindowAnchor): ToolWindowState[] {
		return Object.values(windows)
			.filter((w) => w.anchor === anchor && w.visible)
			.sort((a, b) => a.order - b.order);
	}

	function getAll(): ToolWindowState[] {
		return Object.values(windows).sort((a, b) => a.order - b.order);
	}

	return { windows, register, setAnchor, setVisible, toggle, setSize, getByAnchor, getAll };
}

// Singleton instance (module-level rune state)
const _manager = createToolWindowManager();

/** Returns the global ToolWindowManager instance */
export function useToolWindowManager() {
	return _manager;
}
