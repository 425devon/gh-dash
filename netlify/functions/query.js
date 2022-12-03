const { Octokit } = require("@octokit/rest");


exports.handler = async function (event, context) {
    const octokit = new Octokit({ auth: `${process.env.REACT_APP_GH_PAT}` });
};