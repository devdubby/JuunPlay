import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getMovieSimilar, getShowSimilar } from "../../../actions";
import WorksPresenter from "./WorksPresenter";

class WorksContainer extends Component { 
  constructor(props) {
    super(props);
    console.log('suer', props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      works: null,
      isMovie: pathname.includes("/movie/"),
      loading: true,
      error: null,
    };
  };

  async componentDidMount() {
    const { isMovie } = this.state;
    const { match: { params: { id } } } = this.props;
    try {
      const works = isMovie ? await getMovieSimilar(id) : await getShowSimilar(id);
      this.setState({ works });
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { works, loading, error } = this.state;
    console.log('wroks', works);
    return (
      <WorksPresenter 
        works={works}
        loading={loading}
        error={error}
      />
    );
  };
}

export default withRouter(WorksContainer);