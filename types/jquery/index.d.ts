declare function jQuery(selector: string): HTMLElement
// namespace 扩展了 jQuery 上的方法
declare namespace jQuery {
	function ajax(url: string): void
}

// export default jQuery
export = jQuery // TS 语法