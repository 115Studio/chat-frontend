import hljs from 'highlight.js/lib/core'
import highlightJS from '@highlightjs/vue-plugin'
import 'highlight.js/styles/github.css'

import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'
import typescript from 'highlight.js/lib/languages/typescript'
import java from 'highlight.js/lib/languages/java'
import csharp from 'highlight.js/lib/languages/csharp'
import cpp from 'highlight.js/lib/languages/cpp'
import go from 'highlight.js/lib/languages/go'
import ruby from 'highlight.js/lib/languages/ruby'
import php from 'highlight.js/lib/languages/php'
import html from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import json from 'highlight.js/lib/languages/json'
import bash from 'highlight.js/lib/languages/bash'
import sql from 'highlight.js/lib/languages/sql'
import yaml from 'highlight.js/lib/languages/yaml'
import markdown from 'highlight.js/lib/languages/markdown'
import swift from 'highlight.js/lib/languages/swift'
import kotlin from 'highlight.js/lib/languages/kotlin'
import rust from 'highlight.js/lib/languages/rust'
import lua from 'highlight.js/lib/languages/lua'
import shell from 'highlight.js/lib/languages/shell'
import powershell from 'highlight.js/lib/languages/powershell'
import objectivec from 'highlight.js/lib/languages/objectivec'
import scala from 'highlight.js/lib/languages/scala'
import elixir from 'highlight.js/lib/languages/elixir'
import haskell from 'highlight.js/lib/languages/haskell'
import perl from 'highlight.js/lib/languages/perl'
import dart from 'highlight.js/lib/languages/dart'
import r from 'highlight.js/lib/languages/r'
import clojure from 'highlight.js/lib/languages/clojure'
import groovy from 'highlight.js/lib/languages/groovy'
import erlang from 'highlight.js/lib/languages/erlang'
import ocaml from 'highlight.js/lib/languages/ocaml'


export default defineNuxtPlugin((nuxtApp) => {
  hljs.registerLanguage('javascript', javascript)
  hljs.registerLanguage('python', python)
  hljs.registerLanguage('typescript', typescript)
  hljs.registerLanguage('java', java)
  hljs.registerLanguage('csharp', csharp)
  hljs.registerLanguage('cpp', cpp)
  hljs.registerLanguage('go', go)
  hljs.registerLanguage('ruby', ruby)
  hljs.registerLanguage('php', php)
  hljs.registerLanguage('xml', html)
  hljs.registerLanguage('css', css)
  hljs.registerLanguage('json', json)
  hljs.registerLanguage('bash', bash)
  hljs.registerLanguage('sql', sql)
  hljs.registerLanguage('yaml', yaml)
  hljs.registerLanguage('markdown', markdown)
  hljs.registerLanguage('swift', swift)
  hljs.registerLanguage('kotlin', kotlin)
  hljs.registerLanguage('rust', rust)
  hljs.registerLanguage('lua', lua)
  hljs.registerLanguage('shell', shell)
  hljs.registerLanguage('powershell', powershell)
  hljs.registerLanguage('objectivec', objectivec)
  hljs.registerLanguage('scala', scala)
  hljs.registerLanguage('elixir', elixir)
  hljs.registerLanguage('haskell', haskell)
  hljs.registerLanguage('perl', perl)
  hljs.registerLanguage('dart', dart)
  hljs.registerLanguage('r', r)
  hljs.registerLanguage('clojure', clojure)
  hljs.registerLanguage('groovy', groovy)
  hljs.registerLanguage('erlang', erlang)
  hljs.registerLanguage('ocaml', ocaml)

  nuxtApp.vueApp.use(highlightJS)
})
