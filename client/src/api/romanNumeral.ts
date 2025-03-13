// Requests the roman numeral value from the `romannumeral` api
// passing the value and handling the error appropritately
export default async (value: number) => {
    return fetch(`http://localhost:8080/romannumeral?query=${value}`);
}