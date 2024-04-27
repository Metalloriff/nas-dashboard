import moment from "moment";
import { useEffect, useState } from "react";
import { useInterval } from "../../Classes/Hooks";
import { Module } from "../../Pages/Home";

export function ttill(dateStr) {
	let date = dateStr;

	if (typeof (dateStr) === "string") {
		date = moment(dateStr);
	}
	else {
		console.log("what");
		console.log(dateStr);
	}

	if (!date.isValid()) {
		return console.error("Invalid date.");
	}

	const current_date = moment();

	const years = date.diff(current_date, "years");
	current_date.add(years, "years");
	const months = date.diff(current_date, "months");
	current_date.add(months, "months");
	const days = date.diff(current_date, "days");
	current_date.add(days, "days");
	const hours = date.diff(current_date, "hours");
	current_date.add(hours, "hours");
	const minutes = date.diff(current_date, "minutes");
	current_date.add(minutes, "minutes");
	const seconds = date.diff(current_date, "seconds");

	const formatted = [];

	if (years > 0) {
		formatted.push(`${years} years`);
	}
	if (months > 0) {
		formatted.push(`${months} months`);
	}
	if (days > 0) {
		formatted.push(`${days + 1} days`);
	}
	else if (hours > 0) {
		formatted.push(`${hours} hours`);
		formatted.push(`${minutes} minutes`);
		formatted.push(`${seconds} seconds`);
	}

	return {
		years,
		months,
		days,
		hours,
		minutes,
		seconds,
		formatted: current_date.isBefore(date) ? formatted.join(", ") : "Past"
	};
}

export default function CountdownModule({ title = "Countdown", dateStr }) {
	const [data, setData] = useState(null);
	useInterval(() => setData(ttill(dateStr)), 1000, true);

	return !data ? null : (
		<Module>
			<div className="Item">
				<b>{title}</b>
				<div>{data.formatted}</div>
			</div>
		</Module>
	);
}

export function BirthdayModules({ birthdays }) {
	const [converted, setConverted] = useState(null);

	useEffect(() => {
		const cv = {};

		for (const name in birthdays) {
			const bd = birthdays[name];
			const date = moment();

			date.set({ month: parseInt(bd.split("-")[0]) - 1, date: parseInt(bd.split("-")[1]) });

			if (date.isBefore(moment(), "day")) {
				date.add(1, "year");
			}

			cv[name] = date;
		}

		const cvArray = Object.keys(cv).map(name => ({ name, date: cv[name] }));
		cvArray.sort((a, b) => a.date - b.date);

		setConverted(cvArray);
	}, [birthdays]);

	if (!converted) return null;

	return (
		<>
			{converted.map(({ name, date }) => (
				<CountdownModule title={name} key={name} dateStr={date} />
			))}
		</>
	);
}