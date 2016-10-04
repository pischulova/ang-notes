export default function IndexedDBService($q) {
	return {
		init,
		getAllNotes
	};

	function init() {
        var deferred = $q.defer();

        if (this.setUp) {
            deferred.resolve(true);
            return deferred.promise;
        }
        
        var openRequest = window.indexedDB.open("notes_angular_DB", 1);
    
        openRequest.onerror = function(e) {
            console.log("Error opening db");
            deferred.reject(e.toString());
        };

        openRequest.onupgradeneeded = function(e) {
            var thisDb = e.target.result;
            var objectStore;
            
            if (!thisDb.objectStoreNames.contains("notes")) {
                objectStore = thisDb.createObjectStore("notes", {autoIncrement: true});
                objectStore.createIndex("title", "title", {unique: false});
                objectStore.createIndex("tags","tags", {unique: false, multiEntry: true});
            }

    		var date = new Date().toISOString();

    		var temp = [{
    			title: 'Even working',
    			text: 'Even working is a term used in book publishing that means the number of pages in a book is divisible by the number 16 or 32. \n A book with 256, 272 or 288 pages, for instance, is an "even working", whilst a book with 254 or 286 pages is not. The significance of 16 or 32, which form the individual "signatures" of which a book is composed, is that they make the most efficient use of the paper used in the printing of a book.[1] If the number of printed pages in a book is, for example, 258, then the editor will attempt to move material from the two extra pages so that there will not be 14 blank pages at the end of the book (the next even working after 256 being 272 pages).',
    			date: date
    		}, {
				title: 'Weightlifting',
    			text: "Weightlifting, also called Olympic-style weightlifting, or Olympic weightlifting, is an athletic discipline in the modern Olympic programme in which the athlete attempts a maximum-weight single lift of a barbell loaded with weight plates. The two competition lifts in order are the snatch and the clean and jerk. Each weightlifter receives three attempts in each, and the combined total of the highest two successful lifts determines the overall result within a bodyweight category. Bodyweight categories are different for male and female competitors. A lifter who fails to complete at least one successful snatch and one successful clean and jerk also fails to total, and therefore receives an 'incomplete' entry for the competition. The clean and press was once a competition lift, but was discontinued due to difficulties in judging proper form. In comparison with other strength sports, which test limit strength (with or without lifting aids), Weightlifting tests aspects of human ballistic limits (explosive strength); the lifts are therefore executed faster—and with more mobility and a greater range of motion during their execution—than other strength movements. Properly executed, the snatch and the clean and jerk are both dynamic and explosive while appearing graceful, especially when viewed from a recording at a slowed speed. While there are relatively few competitive Olympic weightlifters, the lifts performed in the sport of weightlifting, and in particular their component lifts (e.g. squats, deadlifts, cleans), are commonly used by elite athletes in other sports to train for both explosive and functional strength. Weightlifting at the 1988 Summer Olympics – Men +110 kg. The men 60 kg weightlifting event was the heaviest events at the weightlifting competition of the 1988 Summer Olympics, with competitors required to have a minimum of 110 kilograms of body mass. The competition took place on September 29, and participants were divided in two groups. Each lifter performed in both the snatch and clean and jerk lifts, with the final score being the sum of the lifter's best result in each. The athlete received three attempts in each of the two lifts; the score for the lift was the heaviest weight successfully lifted. \n Men's weight classes: \n 56 kg (123 lb) \n 62 kg (137 lb) \n 69 kg (152 lb) \n 77 kg (170 lb) \n 85 kg (187 lb) \n 94 kg (207 lb) \n 105 kg (231 lb) \n 105 kg and over (231 lb+)",
    			date: date
    		}, {
				title: 'Obannapalem, India',
    			text: "Obannapalem is a Village in Naguluppalapadu, Mandal in Prakasam District of Andhra Pradesh State, India. It belongs to Andhra region.  \n It is located 19 km towards North from District headquarters Ongole. 140 km from State capital Amaravathi. Obannapalem contains people with different castes. But majority of people came from Kamma community and having Polineni,Mandava and Katta surnames. It has nice ancient temples of Ramalayam and Hanuman which are restored. Apart from that there is Sivalayam. Obannapalem lies on near by Andhra Pradesh State Highway 214A and has connectivity to towns and cities through regular buses.This village is near to Naguluppalapadu.",
    			date: date
    		}, {
				title: 'Hilton',
    			text: "Hilton is a village and civil parish in the county of Dorset in southern England. It is sited at an altitude of 135 metres in a small valley which drains chalk hills in the eastern part of the Dorset Downs. It lies within the North Dorset administrative district, approximately 8 miles (13 km) west-south-west of the town of Blandford Forum. The summit of Bulbarrow Hill (274 metres) is 1.5 miles (2.4 km) north of the village. In the 2011 census the parish—which includes the settlement of Ansty to the west—had 231 dwellings, 206 households and a population of 477. Hilton used to form a part of the estate of the nearby Milton Abbey when it was owned by the rich Hambro family; the Hambros, who often used to entertain Edward VII, planted woods on the surrounding hills, to provide cover for pheasants.[3] However the woods surrounding Hilton today are mostly post-war plantations of beech (Fagus sylvatica) and ash (Fraxinus excelsior) as the hills were cleared during WW2. Large areas are privately owned, although there are open access areas owned and managed by the Forestry Commission.",
    			date: date
    		}
    		];
    		temp.forEach((note) => {
    			objectStore.add(note);
    		});
        };

        openRequest.onsuccess = (e) => {
            this.db = e.target.result;
            
            this.db.onerror = function(event) {
                deferred.reject("Database error: " + event.target.errorCode);
            };
    
            this.setUp = true;
            deferred.resolve(true);
        };  

        return deferred.promise;
    }

	function getAllNotes() {
		var deferred = $q.defer();
        
        init.call(this).then(() => {

            var result = [];

            var handleResult = function(e) {  
                var cursor = e.target.result;
                if (cursor) {
                    result.push({
                    	key:cursor.key, 
                    	title:cursor.value.title, 
                    	text:cursor.value.text, 
                    	date:cursor.value.date});
                    cursor.continue();
                }
            };  
            
            var transaction = this.db.transaction(["notes"], "readonly");  
            var objectStore = transaction.objectStore("notes");
            objectStore.openCursor().onsuccess = handleResult;

            transaction.oncomplete = function(e) {
                deferred.resolve(result);
            };
        
        });
        return deferred.promise;
	}
}