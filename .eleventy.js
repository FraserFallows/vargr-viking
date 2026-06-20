module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("style.css");
    eleventyConfig.addPassthroughCopy("script.js");
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("CNAME");
    eleventyConfig.addPassthroughCopy("admin.html");

    return {
        htmlTemplateEngine: "njk",
        dir: {
            input: "src",
            output: "_site"
        }
    };
};