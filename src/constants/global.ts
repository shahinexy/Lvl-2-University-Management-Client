const monthsName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthOptions = monthsName.map((month) => ({
  value: month,
  label: month,
}));

const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const bloodGroupOptions = bloodGroup.map((blood) => ({
  value: blood,
  label: blood,
}));

const gender = ["male", "female"];

export const genderOptions = gender.map((blood) => ({
  value: blood,
  label: blood,
}));