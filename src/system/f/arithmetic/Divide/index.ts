import { Functional } from '../../../../Class/Functional'
import { Done } from '../../../../Class/Functional/Done'
import { Pod } from '../../../../pod'
import { System } from '../../../../system'

export interface I {
  a: number
  b: number
}

export interface O {
  'a ÷ b': number
}

export default class Divide extends Functional<I, O> {
  constructor(system: System, pod: Pod) {
    super(
      {
        i: ['a', 'b'],
        o: ['a ÷ b'],
      },
      {},
      system,
      pod
    )
  }

  f({ a, b }: I, done: Done<O>): void {
    if (b === 0) {
      done(undefined, 'cannot divide by 0')
    } else {
      done({ 'a ÷ b': a / b })
    }
  }
}
