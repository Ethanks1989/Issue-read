import marked from 'marked'
import dayjs from 'dayjs'

const apiDemo = new Vue({
  el: '#app',
  data: {
    config: null,
    anIssue: null,
    anIssueBody: '',
    anIssueComments: null
  },
  methods: {

    // Markdown 轉為 HTML
    markdownToHtml(input) {
      return marked(input)
    },

    // dayjs format 時間
    formatTime(time) {
      return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    },

    // 取單個 Issue
    // https://docs.github.com/en/rest/reference/issues#get-an-issue
    getAnIssue() {
      fetch("https://api.github.com/repos/letswritetw/letswrite-github-api-issues-get/issues/1", this.config)
        .then(response => response.json())
        .then(result => {
          this.anIssue = result;
          this.anIssueBody = marked(this.anIssue.body);
          console.log(this.anIssue)
        })
        .catch(error => console.log('error', error));
    },
    // 取單個 Issue 裡的所有 Comments
    // https://docs.github.com/en/rest/reference/issues#list-issue-comments
    getAnIssueComments() {
      fetch("https://api.github.com/repos/letswritetw/letswrite-github-api-issues-get/issues/1/comments", this.config)
        .then(response => response.json())
        .then(result => {
          this.anIssueComments = result;
          console.log(this.anIssueComments)
        })
        .catch(error => console.log('error', error));
    }
  },
  created() {

    const headers = new Headers();
    headers.append("Accept", "application/vnd.github.v3+json");
    this.config = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    }

    this.getAnIssue();
    this.getAnIssueComments();
  },
})