/*const names: Array<string> = [];
names[0].split(" ");

const promise: Promise<number> = new Promise((res, rej) => {
  setTimeout(() => {
    res(9);
  }, 2000);
});

promise.then(data => {
    data.split(' ');
})

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergeObj = merge({ name: "Alex", hobbies: ['Sports'] }, { age: 89 });

console.log(mergeObj);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    descriptionText = `Got 1 element.`;
  } else if (element.length > 1) {
    descriptionText = `Got ${element.length} elements.`;
  }

  return [element, descriptionText];
}

console.log(countAndDescribe(["Sports", "Cooking"]));

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return `Value: ${obj[key]}`;
}

console.log(extractAndConvert({name: 'Alex'}, 'name'));

class DataStorage<T extends string | number | object> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if(this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string | number>();
textStorage.addItem('text #1');
textStorage.addItem('text #2');
textStorage.addItem(991);
textStorage.removeItem('text #2');
console.log(textStorage.getItems());

const objStorage = new DataStorage<object>();
const alexObj = {name: 'Alex'};
objStorage.addItem(alexObj);
objStorage.addItem({name: 'Max'});
objStorage.removeItem(alexObj);
console.log(objStorage.getItems());*/

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;

  return courseGoal as CourseGoal;
}

const names = ['Max', 'Sports'];
names.push('Manu');