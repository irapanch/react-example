import React, { Component } from "react";
import { Header } from "./Header";
import { PostList } from "./PostList";
import { fetchPosts } from "../../services/postApi";
import { WrapperPosts } from "./Posts.styled";
import { Button } from "./Button";
import { toast } from "react-toastify";

export default class Posts extends Component {
  state = {
    posts: [],
    limit: 2,
    skip: 0,
    loading: false,
    error: null,
  };
  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const { posts, limit } = await fetchPosts({
        limit: this.state.limit,
        skip: this.state.skip,
      }); // деструктуризація постів з data
      this.setState((prev) => ({ posts: [...prev.posts, ...posts], limit }));
    } catch (error) {
      alert(error.message);
    } finally {
      toast.success("You data is ready!");
      this.setState({ loading: false });
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    const { skip } = this.state;
    if (prevState.skip !== skip) {
      this.setState({ loading: true });
      try {
        const { posts, limit } = await fetchPosts({
          limit: this.state.limit,
          skip: this.state.skip,
        }); // деструктуризація постів з data
        this.setState((prev) => ({ posts: [...prev.posts, ...posts], limit }));
        toast.info(`You add to your posts ${this.state.limit} elems!`);
      } catch (error) {
        alert(error.message);
      } finally {
        this.setState({ loading: false });
      }
    }
  }
  handleLoadMore = () => {
    this.setState((prev) => ({ skip: prev.skip + prev.limit }));
  };
  render() {
    const { posts, loading } = this.state;
    return (
      <div>
        <Header />
        <WrapperPosts>
          {loading && !posts.length ? (
            <h1>Loading...</h1>
          ) : (
            <PostList posts={posts} />
          )}

          <Button onClick={() => alert("Hello")} className="big" $bg="teal">
            Example
          </Button>
          <Button disabled={loading} onClick={this.handleLoadMore} $bg="gray">
            {loading ? "Loading..." : "Load more"}
          </Button>
        </WrapperPosts>
      </div>
    );
  }
}
