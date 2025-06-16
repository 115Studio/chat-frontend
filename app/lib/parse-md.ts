export type InlineToken =
  | { type: 'text'; content: string }
  | { type: 'bold'; content: string; inline?: InlineToken[] }
  | { type: 'italic'; content: string; inline?: InlineToken[] }
  | { type: 'bold-italic'; content: string; inline?: InlineToken[] }
  | { type: 'strike'; content: string; inline?: InlineToken[] }
  | { type: 'link'; text: string; href: string }
  | { type: 'inline-code', content: string }

export type ListItem = {
  text: InlineToken[]
  subItems?: { text: InlineToken[] }[]
}

export type Token =
  | { type: 'text'; content: string; inline?: InlineToken[] }
  | { type: 'link'; text: string; href: string }
  | { type: 'image'; alt: string; src: string }
  | { type: 'bold'; content: string; inline?: InlineToken[] }
  | { type: 'italic'; content: string; inline?: InlineToken[] }
  | { type: 'bold-italic'; content: string; inline?: InlineToken[] }
  | { type: 'strike'; content: string; inline?: InlineToken[] }
  | { type: 'list'; items: string[] }
  | { type: 'ulist'; items: ListItem[] }
  | { type: 'code', content: string, language?: string }
  | { type: 'inline-code', content: string }
  | { type: 'hr' }
  | { type: 'heading'; strength: 1 | 2 | 3 | 4; content: string }
  | { type: 'break' }

function parseInlineMarkdown(text: string): InlineToken[] {
  const tokens: InlineToken[] = []
  let remaining = text

  while (remaining.length > 0) {
    const matches = []

    const linkMatch = remaining.match(/\[(.*?)]\((.*?)\)/)
    if (linkMatch && linkMatch.index !== undefined && linkMatch[1] && linkMatch[2]) {
      matches.push({
        type: 'link',
        start: linkMatch.index,
        end: linkMatch.index + linkMatch[0].length,
        match: linkMatch,
        priority: 1
      })
    }

    const boldItalicMatch = remaining.match(/\*\*\*(.*?)\*\*\*/)
    if (boldItalicMatch && boldItalicMatch.index !== undefined && boldItalicMatch[1]) {
      matches.push({
        type: 'bold-italic',
        start: boldItalicMatch.index,
        end: boldItalicMatch.index + boldItalicMatch[0].length,
        match: boldItalicMatch,
        priority: 2
      })
    }

    const boldMatch = remaining.match(/\*\*(.*?)\*\*/)
    if (boldMatch && boldMatch.index !== undefined && boldMatch[1]) {
      matches.push({
        type: 'bold',
        start: boldMatch.index,
        end: boldMatch.index + boldMatch[0].length,
        match: boldMatch,
        priority: 3
      })
    }

    const italicMatch = remaining.match(/\*(.*?)\*/)
    if (italicMatch && italicMatch.index !== undefined && italicMatch[1]) {
      matches.push({
        type: 'italic',
        start: italicMatch.index,
        end: italicMatch.index + italicMatch[0].length,
        match: italicMatch,
        priority: 4
      })
    }

    const strikeMatch = remaining.match(/~~(.*?)~~/)
    if (strikeMatch && strikeMatch.index !== undefined && strikeMatch[1]) {
      matches.push({
        type: 'strike',
        start: strikeMatch.index,
        end: strikeMatch.index + strikeMatch[0].length,
        match: strikeMatch,
        priority: 5
      })
    }

    const inlineCodeMatch = remaining.match(/`(.*?)`/)
    if (inlineCodeMatch && inlineCodeMatch.index !== undefined && inlineCodeMatch[1]) {
      const codeStart = inlineCodeMatch.index
      const codeEnd = inlineCodeMatch.index + inlineCodeMatch[0].length

      const isWithinOtherFormatting = matches.some(match =>
        match.start < codeStart && match.end > codeEnd
      )

      if (!isWithinOtherFormatting) {
        matches.push({
          type: 'inline-code',
          start: codeStart,
          end: codeEnd,
          match: inlineCodeMatch,
          priority: 6
        })
      }
    }

    if (matches.length === 0) {
      tokens.push({ type: 'text', content: remaining })
      break
    }

    matches.sort((a, b) => {
      if (a.start !== b.start) return a.start - b.start
      return a.priority - b.priority
    })

    const firstMatch = matches[0]!

    if (firstMatch.start > 0) {
      const beforeText = remaining.substring(0, firstMatch.start)
      tokens.push(...parseInlineMarkdown(beforeText))
    }

    switch (firstMatch.type) {
      case 'link':
        tokens.push({
          type: 'link',
          text: firstMatch.match[1]!,
          href: firstMatch.match[2]!
        })
        break
      case 'bold-italic':
        {
          const boldItalicContent = firstMatch.match[1]!

          if (hasInlineFormatting(boldItalicContent))
            tokens.push({ type: 'bold-italic', content: boldItalicContent })
          else
            tokens.push({ type: 'bold-italic', content: boldItalicContent })

          break
        }
      case 'bold':
        {
          const boldContent = firstMatch.match[1]!

          if (hasInlineFormatting(boldContent)) {
            const nestedTokens = parseInlineMarkdown(boldContent)
            tokens.push({
              type: 'bold',
              content: boldContent,
              inline: nestedTokens
            })
          } else
            tokens.push({ type: 'bold', content: boldContent })

          break
        }
      case 'italic':
        {
          const italicContent = firstMatch.match[1]!

          if (hasInlineFormatting(italicContent)) {
            const nestedTokens = parseInlineMarkdown(italicContent)
            tokens.push({
              type: 'italic',
              content: italicContent,
              inline: nestedTokens
            })
          } else
            tokens.push({ type: 'italic', content: italicContent })

          break
        }
      case 'strike':
        {
          const strikeContent = firstMatch.match[1]!

          if (hasInlineFormatting(strikeContent)) {
            const nestedTokens = parseInlineMarkdown(strikeContent)
            tokens.push({
              type: 'strike',
              content: strikeContent,
              inline: nestedTokens
            })
          } else
            tokens.push({ type: 'strike', content: strikeContent })

          break
        }
      case 'inline-code':
        tokens.push({ type: 'inline-code', content: firstMatch.match[1]! })
        break
    }

    remaining = remaining.substring(firstMatch.end)
  }

  return tokens
}

function hasInlineFormatting(text: string): boolean {
  return /`.*?`|\*.*?\*|~~.*?~~|\[.*?]\(.*?\)/.test(text)
}

export function parseMarkdown(markdown: string): Token[] {
  const tokens: Token[] = []
  const lines = markdown.split('\n')
  const numberedListRegex = /^(\d+)\.\s+(.*)$/
  const unorderedListRegex = /^[-*+]\s+(.*)$/
  const subItemRegex = /^\s{2,}[-*+]\s+(.*)$/

  let inNumberedList = false
  let numberedListItems: string[] = []

  let inUnorderedList = false
  let unorderedListItems: ListItem[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    const numberedMatch = line.match(numberedListRegex)
    const unorderedMatch = line.match(unorderedListRegex)
    const subItemMatch = line.match(subItemRegex)

    if (numberedMatch) {
      if (inUnorderedList) {
        tokens.push({ type: 'ulist', items: unorderedListItems })
        unorderedListItems = []
        inUnorderedList = false
      }
      inNumberedList = true
      numberedListItems.push(numberedMatch[2] || '')
    } else if (unorderedMatch && !subItemMatch) {
      if (inNumberedList) {
        tokens.push({ type: 'list', items: numberedListItems })
        numberedListItems = []
        inNumberedList = false
      }
      inUnorderedList = true
      const itemText = unorderedMatch[1] || ''
      unorderedListItems.push({
        text: parseInlineMarkdown(itemText)
      })
    } else if (subItemMatch && inUnorderedList) {
      const lastItem = unorderedListItems[unorderedListItems.length - 1]
      if (lastItem) {
        if (!lastItem.subItems) lastItem.subItems = []

        const subItemText = subItemMatch[1] || ''
        lastItem.subItems.push({
          text: parseInlineMarkdown(subItemText)
        })
      }
    }
    else if (/^---+$/.test(line))
      tokens.push({ type: 'hr' })
    else if (trimmed === 'DO-NOT-RENDER')
      continue
    else if (trimmed === '') {
      if (inNumberedList) {
        tokens.push({ type: 'list', items: numberedListItems })
        numberedListItems = []
        inNumberedList = false
      }
      if (inUnorderedList) {
        tokens.push({ type: 'ulist', items: unorderedListItems })
        unorderedListItems = []
        inUnorderedList = false
      }
      tokens.push({ type: 'break' })
    } else if (inNumberedList) {
      numberedListItems[numberedListItems.length - 1] += '\n' + trimmed
    } else if (inUnorderedList) {
      const lastItem = unorderedListItems[unorderedListItems.length - 1]
      if (lastItem && lastItem.text.length > 0) {
        const lastTextToken = lastItem.text[lastItem.text.length - 1]
        if (lastTextToken && lastTextToken.type === 'text')
          lastTextToken.content += '\n' + trimmed
        else
          lastItem.text.push({ type: 'text', content: '\n' + trimmed })
      }
    }
    else if (/!\[(.*?)]\((.*?)\)/.test(line)) {
      const linkMatch = line.match(/\[(.*?)]\((.*?)\)/)
      if (linkMatch && linkMatch[1] && linkMatch[2])
        tokens.push({
          type: 'image',
          alt: linkMatch[1],
          src: linkMatch[2],
        })
      else
        tokens.push({ type: 'text', content: line })
    }
    else if (/^`{3}/.test(line)) {
      const codeBlockMatch = line.match(/^`{3}(.*)$/)
      const language = codeBlockMatch?.[1]?.trim() || undefined
      let codeContent = ''
      let codeBlockClosed = false
      let i = lines.indexOf(line) + 1

      while (i < lines.length) {
        if (/^`{3}/.test(lines[i]!)) {
          codeBlockClosed = true
          break
        }

        codeContent += (codeContent ? '\n' : '') + lines[i]
        i++
      }
      if (codeBlockClosed) {
        tokens.push({
          type: 'code',
          content: codeContent,
          language: language
        })
        for (let j = lines.indexOf(line) + 1; j <= i; j++) lines[j] = 'DO-NOT-RENDER'
      } else
        tokens.push({ type: 'text', content: line })
    }
    else if (hasInlineFormatting(line)) {
      tokens.push({
        type: 'text',
        content: line,
        inline: parseInlineMarkdown(line)
      })
    }
    else if (/\*\*\*(.*?)\*\*\*/.test(line))
      tokens.push({
        type: 'bold-italic',
        content: line.replace(/\*\*\*(.*?)\*\*\*/, '$1'),
      })
    else if (/\*\*(.*?)\*\*/.test(line))
      tokens.push({
        type: 'bold',
        content: line.replace(/\*\*(.*?)\*\*/, '$1'),
      })
    else if (/\*(.*?)\*/.test(line))
      tokens.push({
        type: 'italic',
        content: line.replace(/\*(.*?)\*/, '$1'),
      })
    else if (/~~(.*?)~~/.test(line))
      tokens.push({
        type: 'strike',
        content: line.replace(/~~(.*?)~~/, '$1'),
      })
    else if (/^#{1,4}\s/.test(line)) {
      const headingMatch = line.match(/^(#{1,4})\s+(.*)$/)
      if (headingMatch) {
        const strength = (headingMatch[1]?.length ?? 1) as 1 | 2 | 3 | 4
        tokens.push({
          type: 'heading',
          strength,
          content: headingMatch[2] || '',
        })
      }
    } else
      tokens.push({ type: 'text', content: line })
  }

  if (inNumberedList) tokens.push({ type: 'list', items: numberedListItems })
  if (inUnorderedList) tokens.push({ type: 'ulist', items: unorderedListItems })

  return tokens
}
