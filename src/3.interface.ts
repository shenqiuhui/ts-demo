interface List {
  readonly id: number;
  name: string;
  age?: number;
}

interface Result {
  data: List[];
}

function render(result: Result) {
  result.data.forEach((value) => {
    console.log(value.id, value.name)
    if (value.age) {
      console.log(value.age)
    }
    // value.id++ // 报错
  })
}

let result = {
  data: [
    {id: 1, name: 'A', sex: 'male'},
    {id: 2, name: 'B', age: 15},
  ]
}

render(result)

render({
  data: [
    {id: 1, name: 'A', sex: 'male'},
    {id: 2, name: 'B'},
  ]
} as Result)

render(<Result>{
  data: [
    {id: 1, name: 'A', sex: 'male'},
    {id: 2, name: 'B'},
  ]
})

interface StringArray {
  [index: number]: string;
}

const chars: StringArray = ['A', 'B']


// interface Names {
//   [x: string]: string;
//   y: number; // 报错
// }

interface Names {
  [x: string]: string;
  [y: number]: string;
}