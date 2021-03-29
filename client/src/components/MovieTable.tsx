import React from "react";
import { IMovieState } from "../redux/movie/slice";
import { connect } from "react-redux";
import { Switch, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { IMovie } from "../services/interface";
import { appActions, appMapDispatchProps } from "../redux/core";
import { IInitAppState } from "../redux/index";
import defaultImg from '../assets/defaultImg.jpg'
import styled from "styled-components";
import { SwitchType } from "../services/interface";

const ImgContainer = styled.img`
  width:50px;
  height:60px;
`

function mapStateToProps(state: IInitAppState) {
  return {
    datas: state.movie.datas,
  };
}

class MovieTable extends React.Component<IMovieState & typeof appActions> {
  componentDidMount() {
    console.log(this.props.getConditionMovies());
  }

  private getColumns(): ColumnsType<IMovie> {
    return [
      {
        title: '封面',
        dataIndex: "poster",
        render(poster) {
          if (poster) {
            return <ImgContainer src={poster} />
          } else {
            return <ImgContainer src={defaultImg} />
          }
        }
      },
      {
        title: "名称",
        dataIndex: "name",
      },
      {
        title: "地区",
        dataIndex: "areas",
        render(text: string[]) {
          return text.join(" ");
        },
      },
      {
        title: "类型",
        dataIndex: "types",
        render(text: string[]) {
          return text.join("  ")
        }
      },
      {
        title: "时长",
        dataIndex: "timeLong",
        render(timeLong) {
          return timeLong + "分钟"
        }
      },
      {
        title: "正在热映",
        dataIndex: "isHot",
        render: (isHot, record) => {
          return <Switch checked={isHot} onChange={(checked) => {
            this.props.setSwitchType({ id: record._id, type: SwitchType['isHot'], checked: checked })
          }} />
        }
      },
      {
        title: "即将热映",
        dataIndex: "isComming",
        render: (isComming, record) => {
          return <Switch checked={isComming} onChange={(checked) => {
            this.props.setSwitchType({ id: record._id, type: SwitchType['isComming'], checked: checked })
          }} />
        }
      },
      {
        title: "经典影片",
        dataIndex: "isClassic",
        render: (isClassic, record) => {
          return <Switch checked={isClassic} onChange={(checked) => {
            this.props.setSwitchType({ id: record._id, type: SwitchType['isClassic'], checked: checked })
          }} />
        }
      }
    ];
  }

  render() {
    return (
      <Table rowKey="_id" dataSource={this.props.datas} columns={this.getColumns()}></Table>
    );
  }
}

export default connect(mapStateToProps, appMapDispatchProps)(MovieTable);