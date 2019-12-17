import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getMovieSimilar, getShowSimilar } from "../../../actions";
import WorksPresenter from "./WorksPresenter";

class WorksContainer extends Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      works: null,
      isMovie: pathname.includes("/movie/"),
      loading: true,
      error: null,
      similarWorksPage: 1
    };
  }

  async componentDidMount() {
    const { isMovie } = this.state;
    const {
      match: {
        params: { id }
      }
    } = this.props;
    try {
      const works = isMovie
        ? await getMovieSimilar(id)
        : await getShowSimilar(id);
      this.setState({ works });
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false });
    }
  }

  chevronBtnHandler = direction => {
    const {
      works: { results },
      similarWorksPage
    } = this.state;
    if (direction === "left" && similarWorksPage - 1 !== 0) {
      this.setState({ similarWorksPage: similarWorksPage - 1 });
    } else if (
      results.length - 6 * similarWorksPage > 0 &&
      direction === "right"
    ) {
      this.setState({ similarWorksPage: similarWorksPage + 1 });
    }
  };

  render() {
    const { isMovie, works, loading, error, similarWorksPage } = this.state;
    return (
      <WorksPresenter
        isMovie={isMovie}
        works={works}
        loading={loading}
        error={error}
        chevronBtnHandler={this.chevronBtnHandler}
        similarWorksPage={similarWorksPage}
      />
    );
  }
}

export default withRouter(WorksContainer);
