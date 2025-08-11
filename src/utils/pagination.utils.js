const { PAGINATION } = require('../constants/users.constants'); 

module.exports = { 
    getPaginated: async (elementsQuery, elementsCount, pageNumber, perPageCount) => { 
        // Number of pages before page 
        const pagesToSkip = pageNumber - 1; 
        // Number of pages 
        const pagesCount = Math.ceil(elementsCount / perPageCount); 

        // <Number of elements to skip> = <Pages before> * <Number of elements on page> 
        let onPageElements = elementsQuery 
            .skip(pagesToSkip * perPageCount)
            .limit(perPageCount); 

        // if (populatePaths) { 
        //     onPageElements = onPageElements.populate(populatePaths); 
        // } 

        // onPageElements = onPageElements.lean(); 

        // Returns an object with pagination data 
        return { 
            onPageElements, 
            pageNumber, 
            perPageCount, 
            pagesCount, 
            perPageOptions: PAGINATION.USERS_PER_PAGE_OPTIONS 
        }; 
    }, 

}; 
