abstract class Department {
    static fiscalYear = 2023;
    // private id: string;
    // private name: string;
    private employees: string[] = [];

    constructor(protected readonly id: string, public name: string) {
        // this.id = id;
        // this.name = n;
    }

    static createEmploee(name: string) {
        return {name}
    }

    abstract describe(this: Department): void;
    // describe(this: Department) {
    //     console.log(`Department (${this.id}): ${this.name}`);
    // }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    constructor(id: string, public admins: string[]) {
        super(id, 'IT');
    }

    describe() {
        console.log(`IT Department - ID: ${this.id}`);
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.');
    }

    set mostRecentReport(val: string) {
        this.addReport(val);
    }

    describe() {
        console.log(`Accounting Department - Accounting: ${this.id}`);
    }

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }

    addEmployee(employee: string) {
        if (employee === 'Max') {
            return;
        }
        super.addEmployee(employee);
    }
}

const it = new ITDepartment('d1', ['Dan']);

it.addEmployee('Max');
// accounting.name = 'New Name';
it.addEmployee('Alex');

it.describe();
it.printEmployeeInformation();

console.log(it);

// const accounting = new AccountingDepartment('d2', []);
const accounting = AccountingDepartment.getInstance();

// console.log(accounting.mostRecentReport);

accounting.addReport('Report one');
accounting.addEmployee('Max');
accounting.addEmployee('Bob');
accounting.printReports();
accounting.printEmployeeInformation();

accounting.mostRecentReport = 'Report two';
console.log(accounting.mostRecentReport);

console.log(Department.createEmploee('Ann'));

// const accountingCopy = {name: 'DUMMY', describe: accounting.describe};
// accountingCopy.describe();
