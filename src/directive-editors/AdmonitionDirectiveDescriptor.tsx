/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react'
import { NestedLexicalEditor, useNestedEditorContext } from '../plugins/core/NestedLexicalEditor'
import { DirectiveDescriptor } from '../plugins/directives'
import { ContainerDirective } from 'mdast-util-directive'

/** @internal */
export const ADMONITION_TYPES = ['note', 'tip', 'danger', 'info', 'caution'] as const
/** @internal */
export type AdmonitionKind = (typeof ADMONITION_TYPES)[number]

/**
 * Pass this descriptor to the `directivesPlugin` `directiveDescriptors` parameter to enable {@link https://docusaurus.io/docs/markdown-features/admonitions | markdown admonitions}.
 *
 * @example
 * ```tsx
 * <MDXEditor
 *  plugins={[
 *   directivesPlugin({ directiveDescriptors: [ AdmonitionDirectiveDescriptor] }),
 *  ]} />
 * ```
 */
export const AdmonitionDirectiveDescriptor: DirectiveDescriptor = {
  name: 'admonition',
  attributes: [],
  hasChildren: true,
  testNode(node) {
    return ADMONITION_TYPES.includes(node.name as AdmonitionKind)
  },
  Editor({ mdastNode }) {
    const {
      config: { theme },
      focusEmitter
    } = useNestedEditorContext()
    return (
      <div className={theme.admonition[mdastNode.name]}>
        <NestedLexicalEditor<ContainerDirective>
          block
          focusEmitter={focusEmitter}
          getContent={(node) => node.children}
          getUpdatedMdastNode={(mdastNode, children: any) => ({ ...mdastNode, children })}
        />
      </div>
    )
  }
}
