// number of beer taps is...
var n = 1000;
// store the best beers in array.
var bestBeers = [];

// Need to check all beer taps to meet the conditions given.
for (var i = 1; i < n; i++) {
    if (isBestBeer(i)) {
        bestBeers.push(i);
    }
}

// define function to check if best beer
function isBestBeer (i) {
    // As mentoned in question 1 is common for all numbers
    var Fixed_divisor = [1];
    // initialize sum to zero
	var sum = 0;
	var max_div = i/2;
    // We need to find devisors
	for(var devisors = 2; devisors <= max_div; devisors++ ) {
        if(i % devisors==0) {
            // Checking similar devisors in array.
			if(Fixed_divisor.indexOf(devisors) == -1) {
				Fixed_divisor.push(devisors);
                // We need to add divisor and store it in sum
				sum =sum + devisors;
			}
            // Checking similar max_devisor
			max_div = i/devisors;
			if(Fixed_divisor.indexOf(max_div) == -1) {
				Fixed_divisor.push(max_div);
                // We need to add max_devisor and store it in sum
				sum =sum + max_div;
			}
		}
	}
    // The sum of divisors (including 1, but not the number itself) of the tap number is greater than tap number itself
	if(sum > i) {
        // Sort Fixed_divisor in descending order.
		Fixed_divisor.sort(function(a, b) {
            return b - a;
        });
        //  No subset of those divisors sums up to the tap number itself.
		if(!SubsetSumEqualToNum(Fixed_divisor,Fixed_divisor.length,i)) {
            return true;
		} else {
            return false;
        }
	} else {
        return false;
    }
}

// Need to check sum of subsets equals i
function SubsetSumEqualToNum(Fixed_divisor, NumberOfDivisors, i)  {
	// if i is 0, its only subset [] sums up to 0
    if (i == 0) {
        return true;
    }
    // when the amount of divisor reaches 0, that means no subset of Fixeddivisors is equal to the i
	if (NumberOfDivisors == 0) {
        return false;
    }
    // compares smallest divisor to i, if greater return this function but without divisor just used for comparison
	if (Fixed_divisor[NumberOfDivisors - 1] > i) {
        return SubsetSumEqualToNum(Fixed_divisor, NumberOfDivisors - 1, i);
    }
	return SubsetSumEqualToNum(Fixed_divisor, NumberOfDivisors - 1, i) ||
            SubsetSumEqualToNum(Fixed_divisor, NumberOfDivisors - 1, i - Fixed_divisor[NumberOfDivisors - 1]);
}

console.log("the best beers are"+" =>" +bestBeers)
console.log(bestBeers)
