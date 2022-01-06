/**
 * Gets the processing page
 * @param {array>} data
*/
async function getProcessingPage(data) {
	const process = () => new Promise(resolve => setTimeout(() => resolve(), 2000));
	
	for(let x=0;x<data.length;x++){
		const { state, errorCode } = data[x];
		
		if(state === 'processing') await process();
		else {
			let title = '';
			let message = null;
			
			if(state === 'error') {
				switch(errorCode) {
					case 'NO_STOCK':
						message = 'No stock has been found';
						break;
					case 'INCORRECT_DETAILS':
						message = 'Incorrect details have been entered';
						break;
				}
				title = 'Error page';
			}
			
			if(state === 'success') title = 'Order complete';
			
			return { title, message };
		}
	}
}

getProcessingPage(
	[
		{ state: 'processing' },
		{ state: 'error', errorCode: 'INCORRECT_DETAILS' }
	])
	.then(({title, message}) => {
		console.debug(title, message);
	});
