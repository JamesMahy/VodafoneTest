/*
	Reviewer please note:
	I may have over complicated this method, it's not something I've needed to do before
	and I couldn't imagine a real world context where it might be useful.
	
	Happy to go over if there is a better way of doing this
 */

function makeNumSentences(stringOfNums, validNumbers) {

	const newValidNumbers = [...validNumbers];
	const map = {};
	
	// Sort by biggest first, so we ignore subsets
	newValidNumbers.sort((a, b) => b.length - a.length);
	
	// Create an occurrence map so we know if we have any more instances of the number left
	newValidNumbers.forEach((number) => {
		map[number] = `${stringOfNums}`.split(number).length - 1;
	});
	
	const ret = [];
	
	while(newValidNumbers.length > 1){
		// Create a copy of the original input
		let currentCombination = `${stringOfNums}`;
		
		newValidNumbers.forEach((number, index) => {
			/*  Search and replace instance of number with :number:
				we only want to match where it's next to another number
				or the start / end of the string
			 */
			const numberPattern = new RegExp(`(^|[0-9]+)${number}([0-9]+|$)`);
			const newCombination = currentCombination.replace(numberPattern, `$1:${number}:$2`);
			
			if(newCombination !== currentCombination){
				currentCombination = newCombination;
				
				// Safety in case some how the number hasn't been mapped
				if(Object.hasOwnProperty.call(map, number)) {
					// If we've processed all instances of this number, remove it from the array
					if(map[number] === 1) newValidNumbers.splice(index, 1);
					map[number]--;
				}
			}
		});
		// Make sure our combination starts and ends with a colon
		if(!currentCombination.startsWith(':')) currentCombination = `:${currentCombination}`;
		if(!currentCombination.endsWith(':')) currentCombination = `${currentCombination}:`;
		ret.push(currentCombination);
	}
	return ret;
}

nums = '143163421154143';
predefinedNumbers = ['21154', '143', '21154143', '1634', '163421154'];
console.debug(makeNumSentences(nums, predefinedNumbers));
/*
Output:
	[
		":143:1634:21154:143:",
		":143:1634:21154143:"
		":143:163421154:143:",
	]
*/
