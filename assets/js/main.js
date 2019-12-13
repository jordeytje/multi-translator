const bodyElem = document.querySelector('body');

const jsonOutputElem = document.getElementById('json-output');
const jsonObjectName = document.getElementById('object-name');

const jsonObjectInput = document.getElementById('text-input');
const jsonObjectInputElem = document.getElementById('text-input-elem');

const googleTranslater = document.querySelector('#google_translate_element');

var jsonDataArray = [];

// setup MultiLanguageText Format
const multiLanguageTextFormat = document.getElementById('multilanguageOn');
multiLanguageTextFormat.checked
	? (bodyElem.classList.add('multi-language-text-format'),
		(jsonOutputElem.innerHTML = `"${jsonObjectName.value}" : {\n    "": ""\n}\n`))
	: '';

// set object name
function setObjectName() {
	const value = `${jsonObjectName.value}`;
	const name = value.replace(/ /g, '_');
	const btn = document.getElementById('completeStep1');

	value == '' ? btn.classList.remove('activated') : btn.classList.add('activated');
	jsonOutputElem.innerHTML = `"${name}" : {\n    "": ""\n}\n`;
}

// complete step
function completeStep1() {
	const steps = document.querySelectorAll('.step');
	steps.forEach((step) => {
		step.classList.contains('readonly') ? step.classList.remove('readonly') : null;
	});

	steps[0].classList.add('readonly');
}

// prepare textarea text to be translatable
function prepareInputText() {
	const langBtns = document.querySelectorAll('.langBtn');

	if (jsonObjectInput.value !== '') {
		langBtns.forEach((btn) => {
			btn.classList.add('activated');
		});
	} else {
		langBtns.forEach((btn) => {
			btn.classList.remove('activated');
		});
	}

	jsonObjectInputElem.innerText = `${jsonObjectInput.value}`;
}

// translate input
function translateInput(lang) {
	const options = googleTranslater.querySelectorAll('select option');

	options.forEach((option) => {
		// force onchange event
		var event = new Event('change');

		if (option.innerHTML == lang) {
			option.selected = true;
			option.parentElement.dispatchEvent(event);

			setTimeout(function() {
				jsonOutput(option.value, jsonObjectInputElem.children[0].innerText);
			}, 750);
		}
	});
}

// translate all
function translateAllInput() {
	const langEn = document.getElementById('langEn');
	const langIt = document.getElementById('langIt');
	const langDe = document.getElementById('langDe');
	const langFr = document.getElementById('langFr');
	const langEs = document.getElementById('langEs');
	const langCh = document.getElementById('langCh');

	langEn.click();

	setTimeout(function() {
		langIt.click();
	}, 750);

	setTimeout(function() {
		langDe.click();
	}, 1410);

	setTimeout(function() {
		langFr.click();
	}, 2120);

	setTimeout(function() {
		langEs.click();
	}, 2830);

	setTimeout(function() {
		langCh.click();
	}, 3540);

	setTimeout(function() {
		convertAll();
	}, 4250);
}

// update JSON output
function jsonOutput(attr, output) {
	let attrVal = attr;
	let outputVal = output;

	// convert attr to format
	attrVal == 'ga' ? (attrVal = 'it') : null;
	attrVal == 'zh-TW' ? (attrVal = 'ch') : null;

	let dataRow = {
		attrVal,
		outputVal
	};

	jsonDataArray.push(dataRow);
}

// copy JSON content
function copyJson() {
	const elem = document.getElementById('json-output');

	elem.select();
	document.execCommand('copy');
}

function convertAll() {
	console.log(jsonDataArray);

	// const langBtns = document.querySelectorAll('.langBtn');

	jsonOutputElem.innerHTML = `"${jsonObjectName.value}" : {\n`;

	for (let i = 0; i < 6; i++) {
		let dataRow = `    "${jsonDataArray[i].attrVal}": "${jsonDataArray[i].outputVal}"`;

		if (i == 5) {
			jsonOutputElem.value += dataRow;
			jsonOutputElem.value += '\n}';
		} else {
			jsonOutputElem.value += dataRow;
			jsonOutputElem.value += ',\n';
		}
	}
}

function finalizeJson() {
	let str = `${jsonOutputElem.value}`;
	str.slice(0, -1);
	console.log(str);
}
