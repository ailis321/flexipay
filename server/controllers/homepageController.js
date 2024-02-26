// Render function for the homepage
const renderHomepage = (req, res) => {
    // Example logic to fetch data from the database or perform any other operations
    // For example:
    // const data = await ExampleModel.find({});

    // Render the homepage view with any necessary data
    res.render('homepage', {
        // Pass any data you want to render on the homepage here
        // For example:
        // data: data
    });
};

// Render function for the how it works page
const renderHowItWorks = (req, res) => {
    res.render('howItWorks'); // Assuming 'howItWorks.ejs' is in your views directory
};

module.exports = {
    renderHomepage,
    renderHowItWorks,
    
};

