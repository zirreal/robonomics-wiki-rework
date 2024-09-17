const eleventyFetch = require("@11ty/eleventy-fetch");

// TODO: remove "sha/ref" parameters after tests

// const getDocs = async () => {
// 	let url = 'https://api.github.com/repos/zirreal/robonomics-wiki-rework/contents/src/docs';

//   try {
//     let json = await eleventyFetch(url, {
//       duration: "5d",
//       type: "json",
//       fetchOptions: {
//         headers: {
//           Accept: "application/vnd.github+jso",
//           "X-GitHub-Api-Version": "2022-11-28",
// 					Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
//         },
//       },
//     });

//     return json;
//   } catch (error) {
//     console.error(`Fetch failed in github.js. ${error}`);
//   }
// };

// module.exports = async function () {
//   let user = "zirreal";
// 	let repo = "robonomics-wiki-rework"
//   let url = `https://api.github.com/repos/${user}/${repo}/commits`;

// 	const arr = await getDocs();
// 	const result = [];

// 	arr.forEach(async d => {
// 		if(d.name.includes('md')) {
// 			try {
// 				let json = await eleventyFetch(url + `?path=src/docs/${d.name}`, {
// 					duration: "3d",
// 					type: "json",
// 					fetchOptions: {
// 						headers: {
// 							Accept: "application/vnd.github+jso",
// 							"X-GitHub-Api-Version": "2022-11-28",
// 							Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
// 						},
// 					},
// 				});
// 				result.push({name: d.name, author: json[0].commit.author.name, date: json[0].commit.author.date, url: json[0].html_url});
// 			} catch (error) {
// 				console.error(`Fetch failed in github.js. ${error}`);
// 			}
// 		}
// 	})

// 	return result

// };
