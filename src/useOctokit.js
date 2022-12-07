import { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import { paginateGraphql } from "@octokit/plugin-paginate-graphql";

const useOctokit = () => {
    const MyOctokit = Octokit.plugin(paginateGraphql);
    const octokit = new MyOctokit({ auth: `${process.env.REACT_APP_GH_PAT}` });
    const org = process.env.REACT_APP_GITHUB_ORG;
    const [repos, setRepos] = useState(null);
    const [branchProtected, setBranchProtected] = useState([]);
    const [unprotected, setUnprotected] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const query = `query paginate($cursor: String) {
        organization(login: "${org}") {
          repositories(
            first: 100
            after: $cursor
            privacy: PRIVATE
            # orderBy: { field: UPDATED_AT, direction: DESC }
          ) {
            totalCount
            pageInfo{
              endCursor
              hasNextPage
            }
            edges {
              node {
                ... on Repository {
                  id
                  name
                  description
                  url
                  createdAt
                  updatedAt
                  isArchived
                  isPrivate
                  isSecurityPolicyEnabled
                  defaultBranchRef {
                    name
                  }
                  branchProtectionRules(last: 10) {
                    totalCount
                    edges {
                      node {
                        matchingRefs(last: 10) {
                          totalCount
                          nodes {
                            name
                          }
                        }
                        allowsForcePushes
                        requiresStatusChecks
                        requiresLinearHistory
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`

  useEffect(() => {
    async function onLoad() {
        await octokit.graphql.paginate(query)
        .then(res => {
            setIsPending(true)
            return JSON.parse(JSON.stringify(res.organization.repositories.edges))
        })
        .then(repos => {
            const unArchived = repos.filter(repo => !repo.node.isArchived)
            setRepos(unArchived);
            setIsPending(false);

            unArchived.forEach(repo => {
            repo.node.branchProtectionRules.totalCount > 0 ? setBranchProtected(branchProtected => [...branchProtected, repo]) : setUnprotected(unprotected => [...unprotected, repo])
            });
            console.log(`Total branches: ${repos.length} `);
            console.log(repos[0].node);
        })
        .catch( err => {
            setIsPending(false)
            setError(err.message)
        })
    }
    onLoad();
  }, [])

  return { repos, branchProtected, unprotected, isPending, error }
}

export default useOctokit