import { PortableText } from '@portabletext/react'
import moment from 'moment'

import { GetThumbnailUrl } from '../../../global/helpers'
import type { PostProps } from '../../../global/type'
import PageTitle from '../../atoms/Title/PageTitle'

const ImageRender = ({ value }: any) => {
  return (
    <img className="mx-auto rounded-xl" alt={value._key} src={GetThumbnailUrl(value.asset._ref)} />
  )
}

const BlockRender = ({ value }: any) => {
  return (
    <div>{value.children.map((child: any) => formatText(child, value.markDefs, value.style))}</div>
  )
}

const formatText = (value: any, defs: any, style: string) => {
  if (value.marks.includes('strong')) {
    return <span className="font-bold">{value.text}</span>
  }

  if (value.marks.includes('em')) {
    return <span className="italic">{value.text}</span>
  }

  if ((value.marks as string[]).length > 0) {
    const def = defs.find((def: any) => def._key === value.marks[0])
    return (
      <a href={def.href} className="font-semibold underline" target="_blank">
        {value.text}
      </a>
    )
  }

  if (style === 'h1') {
    return <h1 className="text-4xl font-bold">{value.text}</h1>
  }

  if (style === 'h2') {
    return <h2 className="text-3xl font-bold">{value.text}</h2>
  }

  if (style === 'h3') {
    return <h3 className="text-2xl font-bold">{value.text}</h3>
  }

  if (style === 'h4') {
    return <h4 className="text-xl font-bold">{value.text}</h4>
  }

  if (style === 'h5') {
    return <h5 className="text-lg font-bold">{value.text}</h5>
  }

  if (style === 'h6') {
    return <h6 className="text-base font-bold">{value.text}</h6>
  }

  if (style === 'normal') {
    return <span className="text-base">{value.text}</span>
  }

  if (style === 'blockquote') {
    return (
      <blockquote className="border-base-200 bg-base-300 text-base-content w-2/4 p-4 my-4 border-l-4">
        {value.text}
      </blockquote>
    )
  }

  return value.text
}

const components = {
  list: {
    bullet: ({ children }: any) => <ul className="list-disc">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="ml-7">{children}</li>,
  },
  marks: {
    internalLink: ({ value, children }: any) => {
      const { slug = {} } = value
      const href = `/${slug.current}`
      return (
        <a href={href} target="_blank">
          {children}
        </a>
      )
    },
  },
  types: {
    block: BlockRender,
    code: (props: any) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
    image: ImageRender,
  },
}

const Post = (post: PostProps) => {
  return (
    <div className="mt-2">
      <PageTitle value={post.title} />
      <h3 className="card-title md:truncate my-2 text-xs">{moment(post.pubDate).fromNow()}</h3>
      <img src={GetThumbnailUrl(post.mainImage)} alt={post.title} className="w-full rounded-xl" />
      <div className="grid gap-4 mt-4">
        <PortableText value={post.body} components={components} />
      </div>
    </div>
  )
}

export default Post
