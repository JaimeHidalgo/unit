import { Functional } from '../../../../../Class/Functional'
import { Done } from '../../../../../Class/Functional/Done'
import { E } from '../../../../../interface/E'
import { Pod } from '../../../../../pod'
import { System } from '../../../../../system'
import { UnitClass } from '../../../../../types/UnitClass'

export interface I {
  parent: E
  child: UnitClass<any>
}

export interface O {
  i: number
}

export default class AppendChild extends Functional<I, O> {
  constructor(system: System, pod: Pod) {
    super(
      {
        i: ['parent', 'child'],
        o: ['i'],
      },
      {
        input: {
          parent: {
            ref: true,
          },
        },
      },
      system,
      pod
    )
  }

  f({ parent, child }: I, done: Done<O>): void {
    const i = parent.appendChild(child)
    done({ i })
  }
}
