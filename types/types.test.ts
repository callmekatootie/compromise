// a smoke-test for our typescipt typings
import nlp from '../'
import nlpNumbers from '../plugins/numbers'

// vs Typed plugin
type NLPTest = nlp.Plugin<{ test: (text: string) => string }, { test: string }>
const test: NLPTest = (Doc, world) => {
  // Prototype is visible in here with plugin values
  Doc.prototype.test = text => text
  world.test = 'Hello world!'
}

const nlpEx = nlp
  // Give typing to untyped Plugin
  .extend(nlpNumbers)
  // Use typed plugin
  .extend(test)

const doc = nlpEx('hello world') // This type is cleaner
doc.nouns()
doc.nouns().world.test
doc.test('test')
doc.numbers()
doc.numbers().json()
doc.world.test === typeof 'string'

// Demo: For external use
export type NLP = typeof nlpEx

// Standard still works
const docSimple = nlp('test')
docSimple.nouns()
docSimple.nouns().world
nlp.tokenize('test')
nlp.version

// Directly set nlp type
const doc2 = nlp<
  {
    numbers: () => number[]
  },
  {
    a: string
  }
>('test')
doc2.numbers()
doc2.world.a === typeof 'string'