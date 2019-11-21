# coc-explorer

Explorer extension for [coc.nvim](https://github.com/neoclide/coc.nvim)

**Note: Still under development, maybe has some breaking changes.**

[![Build Status](https://travis-ci.com/weirongxu/coc-explorer.svg?branch=master)](https://travis-ci.com/weirongxu/coc-explorer)

## Screenshot

![image](https://user-images.githubusercontent.com/1709861/64966850-1e9f5100-d8d2-11e9-9490-438c6d1cf378.png)

## Requirements

`>= vim 8.0` or `>= neovim 0.3.1`

## Usage

1. Install by coc.nvim command:
   ```
   :CocInstall coc-explorer
   ```
2. Configuration custom vim mapping
   ```
   :nmap ge :CocCommand explorer<CR>
   ```
3. Open explorer
   ```
   ge
   ```
4. Press `?` to show mappings help

## Feature

- [x] Buffer source
  - [x] Highlight visible buffers in real time (neovim only)
- [x] File tree source
  - [x] Basic actions
    - [x] Open file in select / vsplit / tab  
           `explorer.openAction.strategy` options:
      - vsplit: open action with vsplit by default
      - previousBuffer: open action use last used buffer by default
      - select: open action use selection ui by default
    - [x] Selection
    - [x] Cut / Copy / Paste
    - [x] Delete action use trash by default
  - [x] Git status
  - [x] Highlight current buffer in real time (neovim only)
  - [x] Icons, use [nerdfont](https://github.com/ryanoasis/nerd-fonts)
  - [x] Search files by Coc-list
  - [ ] LSP
    - [x] diagnostic
    - [ ] file rename
  - [ ] Exrename, like [defx](https://github.com/Shougo/defx.nvim)
  - [ ] Archive file (use `lsar / unar`)
  - [ ] SSH
- [ ] Git source
  - [ ] Git actions
- [x] Show help

## Command

```
:CocCommand explorer [options] [root-path]
```

### Example

```
:CocCommand explorer
    \ --toggle
    \ --sources=buffer+,file+
    \ --file-columns=git,selection,clip,indent,filename,size /root/path
```

### Options

#### `[root-path]`

Explorer root, default:

- `getcwd()` when `buftype` is `nofile`
- `workspace.rootPath`

#### `--sources`

Explorer sources, example: `buffer+,file+`, default: `buffer-,file+`

#### `--toggle --no-toggle`

Close the explorer if it exists, default: `--toggle`

#### `--width`

Explorer window width, default: `40`

#### `--position`

Explorer position, supported position: `left`, `right`, `tab`, default: `left`

#### `--reveal`

Explorer will expand to this filepath, default: `current buffer`

#### `--buffer-columns`

Explorer buffer columns, supported columns:

- selection
- name
- bufname
- modified
- bufnr

#### `--file-columns`

Explorer file columns, supported columns:

- git
- selection
- icon
- filename
- indent
- clip
- size
- diagnosticError
- diagnosticWarning
- created
- modified
- accessed

## Configuration

<!-- Generated by gen_doc.ts, please don't edit it directly -->
<!-- prettier-ignore -->
- `explorer.keyMappingMode`: Keymapping mode, type: `none | default`, default: `default`
- `explorer.keyMappings`: Custom keymappings, type: `object`, default: `{}`
- `explorer.position`: Explorer position, type: `left | right | tab`, default: `left`
- `explorer.width`: Explorer window width for open in left or right side, type: `number`, default: `40`
- `explorer.toggle`: Close the explorer if it exists, type: `boolean`, default: `true`
- `explorer.autoExpandSingleNode`: Automatically expand next node when it's a single node, type: `boolean`, default: `true`
- `explorer.autoCollapseChildren`: Automatically collapse children, type: `boolean`, default: `true`
- `explorer.activeMode`: Render explorer when after open or save buffer, type: `boolean`, default: `true`
- `explorer.quitOnOpen`: quit explorer when open action, type: `boolean`, default: `false`
- `explorer.openAction.strategy`: Strategy for open action, type: `select | vsplit | previousBuffer`, default: `select`
- `explorer.openAction.select.filterFloatWindows`: Filter floating windows in select strategy, type: `boolean`, default: `true`
- `explorer.openAction.changeDirectory`: Change directory if node is a directory, type: `boolean`, default: `true`
- `explorer.sources`: Explorer sources, type: `array`, default: `[{"name":"buffer","expand":false},{"name":"file","expand":true}]`
- `explorer.icon.enableNerdfont`: Enalbe nerdfont, type: `boolean`, default: `false`
- `explorer.icon.expanded`: Icon for expanded node, type: `string`
- `explorer.icon.collapsed`: Icon for collapsed node, type: `string`
- `explorer.icon.selected`: Selection selected chars for File source, type: `string`, default: `✓`
- `explorer.icon.unselected`: Selection unselected chars for File source, type: `string`, default: ` `
- `explorer.buffer.showHiddenBuffers`: Default show hidden buffers, type: `boolean`, default: `false`
- `explorer.buffer.columns`: Default columns for buffer source, type: `array`, default: `["selection","bufnr","name","modified","readonly","fullpath"]`
- `explorer.file.autoReveal`: Explorer will automatically expand to the current buffer, type: `boolean`, default: `true`
- `explorer.file.diagnosticCountMax`: Maximum count of diagnostic column, type: `number`, default: `99`
- `explorer.file.showHiddenFiles`: Default show hidden files, type: `boolean`, default: `false`
- `explorer.file.columns`: Default columns for file source, type: `array`, default: `["git","selection","clip","diagnosticError","indent","icon","filename","size","modified","readonly"]`
- `explorer.file.column.git.showIgnored`: Show ignored files in git column, type: `boolean`, default: `false`
- `explorer.file.column.git.icon.mixed`: Icon for git mixed status, type: `string`, default: `*`
- `explorer.file.column.git.icon.unmodified`: Icon for git unmodified status, type: `string`, default: ` `
- `explorer.file.column.git.icon.modified`: Icon for git modified status, type: `string`, default: `M`
- `explorer.file.column.git.icon.added`: Icon for git added status, type: `string`, default: `A`
- `explorer.file.column.git.icon.deleted`: Icon for git removed status, type: `string`, default: `D`
- `explorer.file.column.git.icon.renamed`: Icon for git renamed status, type: `string`, default: `R`
- `explorer.file.column.git.icon.copied`: Icon for git copied status, type: `string`, default: `C`
- `explorer.file.column.git.icon.unmerged`: Icon for git unmerged status, type: `string`, default: `U`
- `explorer.file.column.git.icon.untracked`: Icon for git untracked status, type: `string`, default: `?`
- `explorer.file.column.git.icon.ignored`: Icon for git ignored status, type: `string`, default: `!`
- `explorer.file.column.clip.copy`: Whether the file has been copied, type: `string`
- `explorer.file.column.clip.cut`: Whether the file has been cut, type: `string`
- `explorer.file.column.indent.chars`: Indent chars for file source, type: `string`, default: `  `
- `explorer.file.column.indent.topLevel`: Whether to indent it in top level, type: `boolean`, default: `false`
- `explorer.file.column.indent.indentLine`: Whether to display the alignment line, type: `boolean`
- `explorer.file.column.filename.width`: Filename with, type: `integer`, default: `80`
- `explorer.git.command`: Git command, type: `string`, default: `git`
- `explorer.debug`: Enable debug, type: `boolean`, default: `false`

## Custom mappings example

```jsonc
// coc-settings.json
{
  "explorer.keyMappings": {
    "k": "nodePrev",
    "j": "nodeNext",

    "*": "toggleSelection",
    "<tab>": "actionMenu",

    "h": "collapse",
    "l": "expand",
    "J": ["toggleSelection", "normal:j"],
    "K": ["toggleSelection", "normal:k"],
    "gl": "expandRecursive",
    "gh": "collapseRecursive",
    "o": "expandOrShrink",
    "<cr>": "open",
    "e": "open",
    "E": "openInVsplit",
    "t": "openInTab",
    "<bs>": "gotoParent",

    "y": "copyFilepath",
    "Y": "copyFilename",
    "c": "copyFile",
    "x": "cutFile",
    "p": "pasteFile",
    "d": "delete",
    "D": "deleteForever",

    "a": "addFile",
    "A": "addDirectory",
    "r": "rename",

    ".": "toggleHidden",
    "R": "refresh",

    "?": "help",
    "q": "quit",
    "X": "systemExecute",
    "gd": "listDrive",

    "f": "search",
    "F": "searchRecursive",

    "gf": "gotoSource:file",
    "gb": "gotoSource:buffer",

    "[[": "sourcePrev",
    "]]": "sourceNext",

    "[d": "diagnosticPrev",
    "]d": "diagnosticNext",

    "[c": "gitPrev",
    "]c": "gitNext",
    "<<": "gitStage",
    ">>": "gitUnstage"
  }
}
```

## Inspired by

- VSCode Explorer
- [Shougo/vimfiler.vim](https://github.com/Shougo/vimfiler.vim)
- [Shougo/defx.vim](https://github.com/Shougo/defx.vim)
- [lambdalisue/fila.vim](https://github.com/lambdalisue/fila.vim)
