import { debounce, uniq } from '../../../util';
import { hlGroupManager } from '../../../highlight/manager';
import { ExplorerSource, BaseTreeNode } from '../../source';
import { sourceManager } from '../../sourceManager';
import { bufferColumnRegistrar } from './bufferColumnRegistrar';
import './load';
import { loadBufferActions } from './bufferActions';
import { bufferArgOptions } from './argOptions';
import { ViewSource } from '../../../view/viewSource';

export interface BufferNode extends BaseTreeNode<BufferNode, 'root' | 'child'> {
  bufnr: number;
  bufnrStr: string;
  bufname: string;
  fullpath: string;
  name: string;
  unlisted: boolean;
  current: boolean;
  previous: boolean;
  visible: boolean;
  hidden: boolean;
  modifiable: boolean;
  readonly: boolean;
  terminal: boolean;
  modified: boolean;
  readErrors: boolean;
}

const hlg = hlGroupManager.linkGroup.bind(hlGroupManager);

export const bufferHighlights = {
  title: hlg('BufferRoot', 'Constant'),
  hidden: hlg('BufferHidden', 'Comment'),
  expandIcon: hlg('BufferExpandIcon', 'Directory'),
  nameVisible: hlg('BufferNameVisible', 'String'),
  bufname: hlg('BufferBufname', 'Comment'),
  modified: hlg('BufferModified', 'Operator'),
  bufnr: hlg('BufferBufnr', 'Special'),
  readonly: hlg('BufferReadonly', 'Operator'),
  fullpath: hlg('BufferFullpath', 'Comment'),
};

export class BufferSource extends ExplorerSource<BufferNode> {
  showHidden: boolean = this.config.get<boolean>('file.showHiddenBuffers')!;
  view: ViewSource<BufferNode> = new ViewSource<BufferNode>(
    this,
    bufferColumnRegistrar,
    {
      type: 'root',
      isRoot: true,
      expandable: true,
      uid: this.helper.getUid('0'),
      bufnr: 0,
      bufnrStr: '0',
      bufname: '',
      fullpath: '',
      name: '',
      unlisted: true,
      current: false,
      previous: false,
      visible: false,
      hidden: false,
      modifiable: false,
      readonly: true,
      terminal: false,
      modified: false,
      readErrors: false,
    },
  );

  async init() {
    this.disposables.push(
      this.bufManager.onReload(
        debounce(500, async () => {
          if (!this.explorer.visible()) {
            return;
          }
          await this.load(this.view.rootNode);
        }),
      ),
      this.bufManager.onModified(
        debounce(500, async () => {
          if (!this.explorer.visible()) {
            return;
          }
          await this.load(this.view.rootNode);
        }),
      ),
    );

    loadBufferActions(this.action);
  }

  async open() {
    await this.view.parseTemplate(
      'root',
      await this.explorer.args.value(bufferArgOptions.bufferRootTemplate),
    );
    await this.view.parseTemplate(
      'child',
      await this.explorer.args.value(bufferArgOptions.bufferChildTemplate),
      await this.explorer.args.value(
        bufferArgOptions.bufferChildLabelingTemplate,
      ),
    );
  }

  async loadChildren(_parentNode: BufferNode, { force = false } = {}) {
    if (force) {
      await this.bufManager.reload();
    }
    const bufferNodes = this.bufManager.bufferNodes;
    const tabOnly = this.config.get<boolean>('buffer.tabOnly')!;
    if (this.showHidden) {
      return [...bufferNodes];
    } else {
      if (tabOnly) {
        const tabBuflist: number[] = uniq(
          await this.nvim.call('tabpagebuflist', []),
        );
        return bufferNodes.filter(
          (it) => tabBuflist.includes(it.bufnr) && !it.unlisted,
        );
      } else {
        return bufferNodes.filter((it) => !it.unlisted);
      }
    }
  }
}

sourceManager.registerSource('buffer', BufferSource);
