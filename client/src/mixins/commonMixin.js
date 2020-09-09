const commonMixin = {
	methods: {
	
	      get_time_by_epoch(epoch) {
	      /* eslint-disable prefer-template */
	      const a = new Date(parseInt(epoch, 10) * 1000);
	      const months = ['Jun', 'Feb', 'Mer', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	      const year = a.getFullYear();
	      const month = months[a.getMonth()];
	      const date = a.getDate();
	      const hour = a.getHours();
	      const min = a.getMinutes();
	      const amPm = parseInt(hour, 10) < 12 ? 'AM' : 'PM';
	      const hourFormated = parseInt(hour, 10) % 12;
	      const time = month + ' ' + date + ', ' + year + '·' + hourFormated + ':' + min + ' ' + amPm;
	      /* eslint-enable prefer-template */
	      return time;
	    },

	    // should be generic i had problems with ESLint
	    getImgUrl(path) {
	      /* eslint-disable global-require */
	      /* eslint-disable prefer-template */
	      /* eslint-disable import/no-dynamic-require */
	      /* eslint-disable no-useless-concat */
	      switch (path) {
	        case 'dogs':
	          return require('../assets/topics/dogs.png');
	        case 'cells':
	          return require('../assets/topics/cells.png');
	        case 'camouflage':
	          return require('../assets/topics/camouflage.png');
	        case 'ada lovelace':
	          return require('../assets/topics/adalovelace.png');
	        case 'dna':
	          return require('../assets/topics/dna.png');
	        default:
	          return require('../assets/topics/dogs.png');
	      }
	      /* eslint-enable no-useless-concat */
	      /* eslint-enable import/no-dynamic-require */
	      /* eslint-enable prefer-template */
	      /* eslint-enable global-require */
	    },
	}

}

export {commonMixin}