<template>
  <el-tabs
    :tab-position="tabPosition"
    @tab-click="handleClick"
    v-model="activeName"
    :before-leave="leaveTab"
  >
    <el-tab-pane label="前置信息" name="1">
      <el-form :inline="true" :model="infomation">
        <el-row>
          <el-col>
            <span>中介名称</span>
          </el-col>
        </el-row>
        <el-input v-model="infomation.agent" style="width: 10rem" />
        <el-row> </el-row>

        <el-row style="margin-top: 2rem">
          <span> 订单号</span>
        </el-row>
        <el-row>
          <el-input
            v-model="infomation.orderid"
            style="width: 60rem"
            @blur="getOrderid()"
          />
        </el-row>

        <el-row style="margin-top: 2rem">
          <span> 学生姓名</span>
        </el-row>
        <el-row>
          <el-input v-model="infomation.studentname" style="width: 60rem" />
        </el-row>

        <el-row style="margin-top: 2rem">
          <span>性别 </span>
        </el-row>
        <el-row>
          <el-input v-model="infomation.sex" style="width: 60rem" />
        </el-row>

        <el-row style="margin-top: 2rem">
          <span>选校列表 </span>
        </el-row>

        <el-row>
          <el-form label-width="auto" :model="infomation">
            <div
              v-for="(item, schoolIndex) in infomation.infolist"
              :key="schoolIndex"
            >
              <el-form-item :label="'学校名称' + (schoolIndex + 1)">
                <el-select
                  v-model="item.schoolname"
                  clearable
                  placeholder="Select"
                  filterable
                  allow-create
                  collapse-tags-tooltip
                  default-first-option
                  :reserve-keyword="false"
                >
                  <el-option
                    v-for="(item, index1) in school_list"
                    :key="index1"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>

              <div>
                <div
                  v-for="(item, zhuanyeIndex) in item.zhuanye"
                  :key="zhuanyeIndex"
                >
                  <el-form-item label="选择专业">
                    <el-input v-model="item.major" />
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="addzhuanye(schoolIndex)">
                      + 专业</el-button
                    >
                    <el-button
                      @click="deletezhuanye(schoolIndex, zhuanyeIndex)"
                    >
                      –
                    </el-button>
                  </el-form-item>

                  <el-form-item label="链接">
                    <el-input v-model="item.link" />
                  </el-form-item>
                </div>
              </div>

              <el-form-item>
                <el-button @click="addItem('first')"> + </el-button>
                <el-button @click="deleteItem(schoolIndex, 'first')">
                  –
                </el-button>
              </el-form-item>
            </div>
          </el-form>
        </el-row>
        <el-form-item>
          <el-button
            style="width: 100%; margin-bottom: 2rem; margin-top: 2rem"
            type="primary"
            @click="addInfomation('first')"
            >下一步
          </el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>

    <el-tab-pane label="动机" name="2">
      <el-form :inline="true" :model="addForm">
        <el-row style="margin-top: 2rem">
          <span
            >喜欢这个专业的原因？（兴趣起源、家庭背景氛围对你的影响，提供一个小事例，使你对这个专业或领域产生兴趣）</span
          >
        </el-row>
        <el-row>
          <el-input
            v-model="addForm.moti1"
            :rows="2"
            type="textarea"
            style="width: 60rem"
          />
          <el-checkbox
            v-model="addForm.checked1"
            label="润色部分"
            size="large"
            style="margin-left: 1rem"
          />
        </el-row>

        <el-row style="margin-top: 2rem">
          <span>
            是否有具体的学术兴趣点，例如金融可以精确至投资、证券；教育可以精确至数字科技对教学评估的影响；药理可以精确至专门针对癌症的研究成果关注；材料学可以精确至陶瓷性能；数字媒体可以精确至大数据分析/云端储存；法律可以精确至公司法、未成年人法……具体些会提升PS个性化</span
          >
        </el-row>
        <el-row>
          <el-input
            v-model="addForm.moti2"
            :rows="2"
            type="textarea"
            style="width: 60rem"
          />
          <el-checkbox
            v-model="addForm.checked2"
            label="润色部分"
            size="large"
            style="margin-left: 1rem"
          />
        </el-row>

        <el-row style="margin-top: 2rem">
          <span
            >最近社会上的热门事件中，是否有与你申请的专业方向相关的事件？请谈一谈你对此的观点（该事件引发了你对目标专业的哪些思考，对于你纵深去学习目标专业有何启发，暴露了目标专业或领域的哪些弊端或契机）
          </span>
        </el-row>
        <el-row>
          <el-input
            v-model="addForm.moti3"
            :rows="2"
            type="textarea"
            style="width: 60rem"
          />
          <el-checkbox
            v-model="addForm.checked3"
            label="润色部分"
            size="large"
            style="margin-left: 1rem"
          />
        </el-row>
        <el-form-item>
          <el-button
            style="width: 100%; margin-bottom: 2rem; margin-top: 2rem"
            type="primary"
            @click="addMotivation('second')"
            >下一步
          </el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="学术背景及收获" name="3">
      <el-form :inline="true" :model="backgroundForm">
        <el-row>
          <span
            >大学本科学习中哪些方面学的特别好？是否有过跨学科的学习经历？如果有的话令你印象深刻或者比较感兴趣的方面是？</span
          >
        </el-row>
        <el-row>
          <el-input
            v-model="backgroundForm.back1"
            :rows="2"
            type="textarea"
            style="width: 60rem"
          />
          <el-checkbox
            v-model="backgroundForm.checked1"
            label="润色部分"
            size="large"
            style="margin-left: 1rem"
          />
        </el-row>
        <el-row style="margin-top: 2rem">
          <span>
            参与某个课堂学习（通过本科课堂学习，你学到了什么和目标申请专业相关的知识和技能？这些所学所想对成功申请有什么帮助？请从专业知识、研究方法、技能工具等方面进行概括总结）</span
          >
        </el-row>

        <el-row>
          <el-form label-width="auto" :model="backgroundForm">
            <div v-for="(item, index) in backgroundForm.backlist" :key="index">
              <el-row style="margin-top: 2rem">
                <span>课程{{ index + 1 }} </span>
              </el-row>
              <el-form-item label="名称">
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="item.name"
                  style="width: 60rem"
                />
              </el-form-item>

              <el-form-item label="授课内容以及你的学习侧重点">
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="item.focus"
                  style="width: 60rem"
                />
              </el-form-item>

              <el-form-item label="让你印象深刻的原因">
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="item.reason"
                  style="width: 60rem"
                />
              </el-form-item>

              <el-form-item label="你的收获">
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="item.gain"
                  style="width: 60rem"
                />
                <el-checkbox
                  v-model="item.checked2"
                  label="润色部分"
                  size="large"
                  style="margin-left: 0.5rem"
                />
              </el-form-item>

              <br />
              <el-form-item style="margin-left: 63rem">
                <el-button @click="addItem('course')" type="success">
                  添加
                </el-button>
                <el-button @click="deleteItem(index, 'course')" type="danger">
                  删除
                </el-button>
              </el-form-item>
            </div>
          </el-form>
        </el-row>

        <el-row style="margin-top: 2rem">
          <span>
            参与某个课题活动；某些实验研究项目；某种学术型竞赛；发表论文等（你有哪些与目标申请专业相关的研究经历，能够向学校证明你的学习和研究能力？在其中遇到了什么学术困难，怎么克服的，或者是如何进行研究的。主要是你做的事情，取得的成就。突出专业性和深度，写明所做事项体现了你具备哪些适合学习目标专业的素质特点）
          </span>
        </el-row>

        <el-row>
          <el-form label-width="auto" :model="backgroundForm">
            <div
              v-for="(item, index) in backgroundForm.academiclist"
              :key="index"
            >
              <el-row style="margin-top: 2rem">
                <span>学术项目{{ index + 1 }} </span>
              </el-row>
              <el-form-item
                label="Situation 项目名称、目的、涉及的具体学术领域"
              >
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="item.field"
                  style="width: 60rem"
                />
              </el-form-item>

              <el-form-item label="Task学术关键点和你在其中需要完成的部分">
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="item.part"
                  style="width: 60rem"
                />
              </el-form-item>

              <el-form-item label="Action你遇到的障碍和学术理解和实际操作：">
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="item.operate"
                  style="width: 60rem"
                />
              </el-form-item>

              <el-form-item label="Result你完成的结果">
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="item.result"
                  style="width: 60rem"
                />
              </el-form-item>

              <el-form-item
                label="Thinking & Reflection回顾整个过程，你产生的进步、新想法和反思"
              >
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="item.reflect"
                  style="width: 60rem"
                />
                <el-checkbox
                  v-model="item.checked3"
                  label="润色部分"
                  size="large"
                  style="margin-left: 0.5rem"
                />
              </el-form-item>
              <br />

              <el-form-item style="margin-left: 63rem">
                <el-button @click="addItem('academic')" type="success">
                  添加
                </el-button>
                <el-button @click="deleteItem(index, 'academic')" type="danger">
                  删除
                </el-button>
              </el-form-item>
            </div>
          </el-form>
          <!-- </el-collapse> -->
        </el-row>

        <el-row style="margin-top: 2rem">
          <span>
            你的学术生涯对后续学习最大的帮助有哪些？（学术上是针对所申请专业的知识和技能，
            整体学习上可能就是科研能力，
            解决问题能力这些软实力，或者是一些新的理念）
          </span>
        </el-row>
        <el-collapse accordion v-model="collapse_back">
          <el-form label-width="auto">
            <el-collapse-item title="学术及学习" :name="collapse_back">
              <el-form-item label="学术方面">
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="backgroundForm.study"
                  style="width: 60rem"
                />
                <el-checkbox
                  v-model="backgroundForm.checked4"
                  label="润色部分"
                  size="large"
                  style="margin-left: 0.5rem"
                />
              </el-form-item>

              <el-form-item label="学习方面">
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="backgroundForm.academic"
                  style="width: 60rem"
                />
                <el-checkbox
                  v-model="backgroundForm.checked5"
                  label="润色部分"
                  size="large"
                  style="margin-left: 0.5rem"
                />
              </el-form-item>
            </el-collapse-item>
          </el-form>
        </el-collapse>

        <el-form-item>
          <el-button
            style="width: 100%; margin-bottom: 2rem; margin-top: 2rem"
            type="primary"
            @click="addBackground('third')"
            >下一步
          </el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="个人经历" name="4">
      <el-form :inline="true" :model="experienceForm">
        <el-row style="margin-top: 2rem">
          <span>
            参与某个实践或者课外活动中，你取得了哪些成绩或者进步，遇到了哪些挫折，你是如何处理的？</span
          >
        </el-row>

        <el-row>
          <el-form label-width="auto" v-model="experienceForm">
            <!-- <el-collapse-item title="活动一" :name="collapse_exp"> -->
            <div v-for="(item, index) in experienceForm.activity" :key="index">
              <el-row style="margin-top: 2rem">
                <span>活动{{ index + 1 }} </span>
              </el-row>
              <el-form-item label="Situation具体事件和起因">
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="item.event"
                  style="width: 60rem"
                />
              </el-form-item>

              <el-form-item label="Task参与的任务">
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="item.task"
                  style="width: 60rem"
                />
              </el-form-item>

              <el-form-item
                label="Action遇到的难点、挫折、障碍时你付出的行动或者采取的措施"
              >
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="item.measure"
                  style="width: 60rem"
                />
              </el-form-item>

              <el-form-item label="Result是否成功，怎么样的结果">
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="item.result"
                  style="width: 60rem"
                />
              </el-form-item>

              <el-form-item
                label="Thinking&Reflection回顾整个过程,你产生的进步、新想法和反思"
              >
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="item.reflect"
                  style="width: 60rem"
                />
                <el-checkbox
                  v-model="item.checked1"
                  label="润色部分"
                  size="large"
                  style="margin-left: 1rem"
                />
              </el-form-item>
              <br />
              <el-form-item style="margin-left: 63rem">
                <el-button @click="addItem('activity')" type="success">
                  添加
                </el-button>
                <el-button @click="deleteItem(index, 'activity')" type="danger">
                  删除
                </el-button>
              </el-form-item>
              <!-- </el-collapse-item> -->
            </div>
          </el-form>
        </el-row>

        <el-row style="margin-top: 2rem">
          <span
            >在与目标申请专业相关的实习和工作实践中，有哪些例子可以证明你具备了动手能力、分析能力、沟通能力、组织能力、其他能力等？
          </span>
        </el-row>

        <el-row>
          <!-- <el-collapse accordion v-model="collapse_exp"> -->
          <el-form label-width="auto" v-model="experienceForm">
            <div
              v-for="(item, index) in experienceForm.experience"
              :key="index"
            >
              <el-row style="margin-top: 2rem">
                <span>经历{{ index + 1 }} </span>
              </el-row>
              <!-- <el-collapse-item title="经历一" :name="collapse_exp"> -->
              <el-form-item label="Situation 该经历的工作背景，岗位和职责">
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="item.duty"
                  style="width: 60rem"
                />
              </el-form-item>

              <el-form-item
                label="Task（举例说明让你印象最深刻的和申请相关的工作任务）"
              >
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="item.task"
                  style="width: 60rem"
                />
              </el-form-item>

              <el-form-item
                label="Action你的任务过程，难点，学术理解和实际操作"
              >
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="item.operate"
                  style="width: 60rem"
                />
              </el-form-item>

              <el-form-item label="Result是否成功，怎么样的结果">
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="item.result"
                  style="width: 60rem"
                />
              </el-form-item>

              <el-form-item label="Result你完成的结果">
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="item.finish"
                  style="width: 60rem"
                />
              </el-form-item>

              <el-form-item
                label="Thinking & Reflection回顾整个过程，你产生进步的能力、和行业知识的收获"
              >
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="item.gain"
                  style="width: 60rem"
                />
                <el-checkbox
                  v-model="item.checked2"
                  label="润色部分"
                  size="large"
                  style="margin-left: 1rem"
                />
              </el-form-item>

              <br />
              <el-form-item style="margin-left: 63rem">
                <el-button @click="addItem('experience')" type="success">
                  添加
                </el-button>
                <el-button
                  @click="deleteItem(index, 'experience')"
                  type="danger"
                >
                  删除
                </el-button>
              </el-form-item>
            </div>
          </el-form>
        </el-row>

        <el-form-item>
          <el-button
            style="width: 100%; margin-bottom: 2rem; margin-top: 2rem"
            type="primary"
            @click="addExperience('four')"
            >下一步
          </el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="择校意向" name="5">
      <el-form :inline="true" :model="schoolForm">
        <el-row>
          <span>你选择申请的硕士课程方向有哪些？具体是什么？</span>
        </el-row>
        <el-row>
          <!-- <el-collapse v-model="collapse_sch" accordion> -->
          <el-form label-width="auto" :model="schoolForm">
            <div v-for="(item, index) in schoolForm.specialist" :key="index">
              <!-- <el-collapse-item title="专业方向" :name="collapse_sch"> -->
              <el-form-item :label="'专业方向' + (index + 1)">
                <el-input
                  :rows="2"
                  type="textarea"
                  v-model="item.specialist"
                  style="width: 60rem"
                />
              </el-form-item>

              <el-select
                placeholder="Select"
                collapse-tags
                collapse-tags-tooltip
                filterable
                multiple
                default-first-option
                :reserve-keyword="false"
                v-model="item.selectSchool"
              >
                <el-option
                  v-for="(item, index2) in school_select"
                  :key="index2"
                  :label="item"
                  :value="item"
                />
              </el-select>

              <br />
              <el-form-item style="margin-left: 55rem">
                <el-button @click="addItem('specialist')" type="success">
                  添加
                </el-button>
                <el-button
                  @click="deleteItem(index, 'specialist')"
                  type="danger"
                >
                  删除
                </el-button>
                <el-checkbox
                  v-model="item.checked1"
                  label="润色部分"
                  size="large"
                  style="margin-left: 1rem"
                />
              </el-form-item>
            </div>
          </el-form>
        </el-row>

        <el-form label-width="auto" :model="schoolForm">
          <div v-for="(item, index) in schoolForm.info" :key="index">
            <el-form-item label="学校">
              <el-input disabled="false" v-model="item.schoolname" />
            </el-form-item>

            <el-form-item label="专业">
              <el-input disabled="false" v-model="item.major" />
            </el-form-item>

            <el-form-item label="链接">
              <el-input disabled="false" v-model="item.link" />
            </el-form-item>

            <div
              v-for="(item1, courseIndex) in item.courses"
              :key="courseIndex"
            >
              <el-form-item label="课程">
                <el-input v-model="item1.course" />
              </el-form-item>

              <el-form-item label="链接">
                <el-input v-model="item1.link" />
              </el-form-item>
              <el-form-item>
                <el-button @click="addintention(index)"> + </el-button>
                <el-button @click="delintention(index, courseIndex)">
                  –
                </el-button>
              </el-form-item>
            </div>

            <el-row>
              <span>
                在你的选校中是否有期待的课程、项目、导师、社团、特色点等？请一一对应地指出学校、专业、内容。</span
              >
            </el-row>
            <el-row>
              <el-input
                v-model="item.sch2"
                :rows="2"
                type="textarea"
                style="width: 60rem"
              />
              <el-checkbox
                v-model="item.checked2"
                label="润色部分"
                size="large"
                style="margin-left: 1rem"
              />
            </el-row>

            <el-row style="margin-top: 2rem">
              <span
                >为什么选择目标学校和专业？请描述你对目标专业的了解，想从中收获什么？陈述观点时避免说套话或百度定义。选择在该学校学习该专业会对你的未来成长或者职业生涯有什么作用？
              </span>
            </el-row>
            <el-row>
              <el-input
                v-model="item.sch3"
                :rows="2"
                type="textarea"
                style="width: 60rem"
              />
              <el-checkbox
                v-model="item.checked3"
                label="润色部分"
                size="large"
                style="margin-left: 1rem"
              />
            </el-row>
            <hr style="margin-top: 5rem; corlor: blue" />
          </div>
        </el-form>

        <el-form-item>
          <el-button
            style="width: 100%; margin-bottom: 2rem; margin-top: 2rem"
            type="primary"
            @click="schoolCareer('five')"
            >下一步
          </el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane
      :label="'职业规划' + (index + 1)"
      :name="6 + index + ''"
      v-for="(item, index) in careerForm.firstcareerspecialist"
      :key="index"
    >
      <el-form :inline="true" :model="careerForm">
        <el-row>
          <div
            v-for="(item, Index) in careerForm.school_major_link"
            :key="Index"
          >
            <el-form-item label="学校">
              <el-input disabled="false" v-model="item.schoolname" />
            </el-form-item>

            <div
              v-for="(major_link, majorindex) in item.zhuanye"
              :key="majorindex"
            >
              <el-form-item label="专业">
                <el-input disabled="false" v-model="major_link.major" />
              </el-form-item>

              <el-form-item label="链接">
                <el-input disabled="false" v-model="major_link.link" />
              </el-form-item>
            </div>
          </div>
        </el-row>
        <el-row>
          <span>如果你成功被录取，你在就学期间有怎样的学习计划？</span>
        </el-row>
        <el-row>
          <el-input
            v-model="item.plan"
            :rows="2"
            type="textarea"
            style="width: 60rem"
          />
          <el-checkbox
            v-model="item.checked1"
            label="润色部分"
            size="large"
            style="margin-left: 1rem"
          />
        </el-row>

        <el-row style="margin-top: 2rem">
          <span>
            你是否有确定的研究方向或者希望研究的课题？请详述实现该规划的学习和研究计划。（请根据专业方向分别填入研究方向）</span
          >
        </el-row>

        <!-- <el-row>
          <el-form label-width="auto">
            <div
              v-for="(item1, courseIndex) in item.CourseLink"
              :key="courseIndex"
            >
              <el-form-item label="课程">
                <el-input v-model="item1.course" />
              </el-form-item>

              <el-form-item label="链接">
                <el-input v-model="item1.course_link" />
              </el-form-item>
              <el-form-item>
                <el-button @click="addcourselink(index)"> + </el-button>
                <el-button @click="delcourselink(index, courseIndex)">
                  –
                </el-button>
              </el-form-item>
            </div>
          </el-form>
        </el-row> -->
        <el-row>
          <el-form-item label="研究方向">
            <el-input
              :rows="2"
              type="textarea"
              v-model="item.firstcareerspecialist"
              style="width: 60rem"
            />
            <el-checkbox
              v-model="item.checked2"
              label="润色部分"
              size="large"
              style="margin-left: 1rem"
            />
          </el-form-item>
        </el-row>

        <el-row style="margin-top: 2rem">
          <span
            >你有哪些未来职业发展计划？毕业后希望从事哪方面的工作？有特别感兴趣的行业或者公司么？请从毕业后的第一份工作1-3年短期目标，3-5年长期目标两个步骤来说明，切忌空泛。
          </span>
        </el-row>
        <el-row style="margin-top: 2rem">
          <span>专业方向 </span>
        </el-row>
        <el-row>
          <el-form label-width="auto">
            <el-form-item label="你的意向领域、行业、岗位">
              <el-input
                :rows="2"
                type="textarea"
                v-model="item.jobs"
                style="width: 60rem"
              />
            </el-form-item>

            <el-form-item
              label="你的短期目标（毕业后1-3年），想从事哪个领域，目标职位，想去哪间公司"
            >
              <el-input
                :rows="2"
                type="textarea"
                v-model="item.company"
                style="width: 60rem"
              />
            </el-form-item>

            <el-form-item
              label="你的长期目标（毕业后3-5年），想从事哪个领域，目标职位，想去哪间公司"
            >
              <el-input
                :rows="2"
                type="textarea"
                v-model="item.company1"
                style="width: 60rem"
              />
            </el-form-item>

            <el-form-item label="其它目标">
              <el-input
                :rows="2"
                type="textarea"
                v-model="item.target"
                style="width: 60rem"
              />
              <el-checkbox
                v-model="item.checked3"
                label="润色部分"
                size="large"
                style="margin-left: 1rem"
              />
            </el-form-item>
          </el-form>
        </el-row>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="其它" name="20">
      <el-form :inline="true">
        <el-row>
          <el-form-item label="其它目标">
            <el-input
              :rows="6"
              type="textarea"
              style="width: 60rem"
              v-model="otherForm.other"
            />
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item style="margin-left: 5rem; margin-top: 5rem">
            <el-button @click="clearForm()" type="success"> 完成 </el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>



<script>
import request from "../utils/request";
export default {
  inject: ["reload"],
  name: "InView",
  data() {
    let self = this;
    return {
      // 择校意向选项
      school_select: [],
      // 专业方向个数
      major_length: 0,
      tabName: 0,
      tabIndex: "",

      tabPosition: "left",
      activeName: "1",
      oldActiveName: "",
      is_orderid: "",
      Collapse: 1,
      collapse_info: "",
      collapse_back: "",
      collapse_exp: "",
      collapse_car: "",
      collapse_sch: "",
      oldActiveName: "",
      info_del: false,
      school_list: [],
      major_list: [],
      infomation: {
        uuid: "",
        agent: "",
        orderid: "",
        studentname: "",
        sex: "",
        username: "",
        id: "",
        infolist: [
          {
            schoolname: "",
            zhuanye: [{ major: "", link: "", uuid: self.getUuid() }],
          },
        ],
      },

      addForm: {
        username: "",
        id: "",
        uuid: "",
        moti1: "",
        moti2: "",
        moti3: "",
        checked1: "",
        checked2: "",
        checked3: "",
      },
      backgroundForm: {
        back1: "",
        checked1: "",
        checked4: "",
        checked5: "",
        backlist: [{ name: "", focus: "", reason: "", gain: "", checked2: "" }],

        academiclist: [
          {
            field: "",
            part: "",
            operate: "",
            result: "",
            reflect: "",
            checked3: "",
          },
        ],
        study: "",
        academic: "",
        username: "",
        id: "",
        uuid: "",
      },
      experienceForm: {
        activity: [
          {
            event: "",
            task: "",
            measure: "",
            result: "",
            reflect: "",
            checked1: "",
          },
        ],
        experience: [
          {
            duty: "",
            task: "",
            operate: "",
            result: "",
            finish: "",
            gain: "",
            checked2: "",
          },
        ],

        username: "",
        id: "",
        uuid: "",
      },
      careerForm: {
        firstcareerspecialist: [
          {
            checked1: "",
            checked2: "",
            checked3: "",
            plan: "",
            firstcareerspecialist: "",
            jobs: "",
            company: "",
            company1: "",
            target: "",
            CourseLink: [{ course: "", link: "" }],
          },
        ],
        school_major_link: [
          { schoolname: "", zhuanye: [{ major: "", link: "" }] },
        ],
        uuid: "",
        num: 0,
      },
      specialist_length: "",
      schoolForm: {
        specialist: [{ specialist: "", selectSchool: "", checked1: "" }],
        username: "",
        id: "",
        uuid: "",
        info: [
          {
            schoolname: "",
            major: "",
            link: "",
            major_uuid: "",
            courses: [{ course: "", course_link: "" }],
            sch2: "",
            checked2: "",
            checked3: "",
            sch3: "",
          },
        ],
      },
      otherForm: {
        other: "",
        uuid: "",
      },
    };
  },

  created() {
    // 获取用户信息  用以展示到首页

    this.first();
    this.second();
    this.third();
    this.four();
    this.five();
    this.six();
    this.getSchoolMajor();
    this.getOther();
    this.schooluuid = this.getUuid;
  },
  mounted() {
    let name = sessionStorage.getItem("currentTab");
    // 判断是否存在currentTab，即tab页之前是否被点击切换到别的页面
    if (name) {
      this.activeName = name;
    }
  },

  methods: {
    async getSchoolMajor() {
      const { data: res } = await request.get("schoolmajor");
      if (res.code != 200) {
        return this.$message.info(res.message);
      }
      this.school_list = res.school_list;
      this.major_list = res.major_list;
    },

    // 新增任务分配
    addItem(par) {
      if (par == "first") {
        let that = this;
        let uuid = this.getUuid();
        that.infomation.infolist.push({
          schoolname: "",
          zhuanye: [{ major: "", link: "", uuid: uuid }],
        });
      } else if (par == "course") {
        this.backgroundForm.backlist.push({
          name: "",
          focus: "",
          reason: "",
          gain: "",
          checked2: "",
        });
      } else if (par == "academic") {
        this.backgroundForm.academiclist.push({
          field: "",
          part: "",
          operate: "",
          result: "",
          reflect: "",
          checked3: "",
        });
      } else if (par == "experience") {
        this.experienceForm.experience.push({
          duty: "",
          task: "",
          operate: "",
          result: "",
          finish: "",
          gain: "",
          checked2: "",
        });
      } else if (par == "activity") {
        this.experienceForm.activity.push({
          event: "",
          task: "",
          measure: "",
          result: "",
          reflect: "",
          checked1: "",
        });
      } else if (par == "specialist") {
        this.schoolForm.specialist.push({
          specialist: "",
          selectSchool: "",
          checked1: "",
        });
        this.careerForm.firstcareerspecialist.push({
          plan: "",
          firstcareerspecialist: "",
          jobs: "",
          company: "",
          company1: "",
          target: "",
          CourseLink: [{ course: "", link: "" }],
          school_major_link: [
            { schoolname: "", zhuanye: [{ major: "", link: "" }] },
          ],
        });
        // console.log('调用')
        // 增加专业方向的同时把职业规划加入到数据库
        this.addCareer("a");
      }
    },

    deleteItem(i, par) {
      if (par == "first") {
        if (this.infomation.infolist.length <= 1) {
          return false;
        }
        this.infomation.infolist.splice(i, 1);
      } else if (par == "course") {
        if (this.backgroundForm.backlist.length <= 1) {
          return;
        }
        this.backgroundForm.backlist.splice(i, 1);
      } else if (par == "academic") {
        if (this.backgroundForm.academiclist.length <= 1) {
          return false;
        }
        this.backgroundForm.academiclist.splice(i, 1);
      } else if (par == "activity") {
        if (this.experienceForm.activity.length <= 1) {
          return false;
        }
        this.experienceForm.activity.splice(i, 1);
      } else if (par == "experience") {
        if (this.experienceForm.experience.length <= 1) {
          return false;
        }
        this.experienceForm.experience.splice(i, 1);
      } else if (par == "specialist") {
        if (this.schoolForm.specialist.length <= 1) {
          return false;
        }
        this.schoolForm.specialist.splice(i, 1);
        this.careerForm.firstcareerspecialist.splice(i, 1);
        // this.delCareer(i);
        sessionStorage.setItem("index", JSON.stringify(i));
      }
    },
    // 添加课程
    addcourselink(courseIndex) {
      this.careerForm.firstcareerspecialist[courseIndex].CourseLink.push({
        course: "",
        link: "",
      });
    },
    // 删除课程
    delcourselink(index, courseIndex) {
      if (this.careerForm.firstcareerspecialist[index].CourseLink.length <= 1) {
        return false;
      }
      this.careerForm.firstcareerspecialist[index].CourseLink.splice(
        courseIndex,
        1
      );
    },

    // 添加课程
    addintention(courseIndex) {
      // console.log(this.schoolForm.CourseLink[courseIndex])
      this.schoolForm.info[courseIndex].courses.push({
        course: "",
        link: "",
      });
    },
    // 删除课程
    delintention(index, courseIndex) {
      if (this.schoolForm.info[index].courses.length <= 1) {
        return false;
      }
      this.schoolForm.info[index].courses.splice(courseIndex, 1);
    },

    addzhuanye(index) {
      let uuid = this.getUuid();
      this.infomation.infolist[index].zhuanye.push({
        major: "",
        link: "",
        uuid: uuid,
      });
    },
    deletezhuanye(schoolIndex, zhuanyeIndex) {
      if (this.infomation.infolist[schoolIndex].zhuanye.length <= 1) {
        return false;
      }
      this.infomation.infolist[schoolIndex].zhuanye.splice(zhuanyeIndex, 1);
    },

    // 生成uuid
    getUuid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },

    // 失去焦点验证order
    async getOrderid() {
      const { data: res } = await request.get(
        "getorderid?orderid=" + this.infomation.orderid
      );
      if (res.code != 200) {
        return this.$message.info(res.message);
      } else {
        return;
      }
    },

    leaveTab(activeName, oldActiveName) {
      //activeName点击切换的tab值
      //oldActiveName离开的tab值
      // console.log(activeName);
      if (oldActiveName == "1") {
        this.first;
        this.addInfomation();
      } else if (oldActiveName == "2") {
        this.second;
        this.addMotivation();
      } else if (oldActiveName == "3") {
        this.third;
        this.addBackground();
      } else if (oldActiveName == "4") {
        this.four;
        this.addExperience();
      } else if (oldActiveName == "5") {
        this.five;
        this.schoolCareer();
      } else if (oldActiveName == "20") {
        this.Other();
        this.getOther();
      } else {
        // let num = Number(oldActiveName) - 6
        // console.log(Number(oldActiveName) - 6)
        this.addCareer();
      }
    },

    async addInfomation(f) {
      if (
        this.infomation.agent == "" &&
        this.infomation.orderid == "" &&
        this.infomation.studentname == "" &&
        this.infomation.sex == "" &&
        this.infomation.infolist[0].schoolname == "" &&
        this.infomation.infolist[0].zhuanye[0].major == "" &&
        this.infomation.infolist[0].zhuanye[0].link == ""
      ) {
        return;
      }

      if (JSON.parse(sessionStorage.getItem("uuid")) == undefined) {
        let uuid = this.getUuid();
        sessionStorage.setItem("uuid", JSON.stringify(uuid));
      }
      this.infomation.uuid = JSON.parse(sessionStorage.getItem("uuid"));
      this.infomation.username = JSON.parse(
        sessionStorage.getItem("userInfo")
      ).username;
      this.infomation.id = JSON.parse(sessionStorage.getItem("userInfo")).id;
      const { data: res } = await request.post("infomation", this.infomation);
      if (res.code !== 200) {
        return;
      }
      // console.log('post info',this.infomation[0])
      this.first();
      this.second();
      if (f) {
        this.activeName = "2";
      }
    },

    async addMotivation(d) {
      if (
        this.addForm.moti1 == "" &&
        this.addForm.moti2 == "" &&
        this.addForm.moti2 == ""
      ) {
        return;
      }

      if (JSON.parse(sessionStorage.getItem("uuid")) == undefined) {
        let uuid = this.getUuid();
        sessionStorage.setItem("uuid", JSON.stringify(uuid));
      }
      this.addForm.uuid = JSON.parse(sessionStorage.getItem("uuid"));
      this.addForm.username = JSON.parse(
        sessionStorage.getItem("userInfo")
      ).username;
      this.addForm.id = JSON.parse(sessionStorage.getItem("userInfo")).id;

      const { data: res } = await request.post("addmotivation", this.addForm);
      if (res.code !== 200) {
        return;
      }
      this.third();
      if (d) {
        this.activeName = "3";
      }

      //   this.backgroundForm.orderid = this.addForm.orderid;
    },

    async addBackground(t) {
      if (
        this.backgroundForm.back1 == "" &&
        this.backgroundForm.backlist[0].name == "" &&
        this.backgroundForm.backlist[0].focus == "" &&
        this.backgroundForm.backlist[0].reason == "" &&
        this.backgroundForm.backlist[0].gain == "" &&
        this.backgroundForm.academiclist[0].field == "" &&
        this.backgroundForm.academiclist[0].part == "" &&
        this.backgroundForm.academiclist[0].operate == "" &&
        this.backgroundForm.academiclist[0].result == "" &&
        this.backgroundForm.academiclist[0].reflect == "" &&
        this.backgroundForm.study == "" &&
        this.backgroundForm.academic == ""
      ) {
        return;
      }
      if (JSON.parse(sessionStorage.getItem("uuid")) == undefined) {
        let uuid = this.getUuid();
        sessionStorage.setItem("uuid", JSON.stringify(uuid));
      }
      this.backgroundForm.uuid = JSON.parse(sessionStorage.getItem("uuid"));
      this.backgroundForm.username = JSON.parse(
        sessionStorage.getItem("userInfo")
      ).username;
      this.backgroundForm.id = JSON.parse(
        sessionStorage.getItem("userInfo")
      ).id;

      const { data: res } = await request.post(
        "background",
        this.backgroundForm
      );
      if (res.code !== 200) {
        return;
      }
      this.four();
      if (t) {
        this.activeName = "4";
      }
    },

    // 个人经历
    async addExperience(a) {
      if (
        this.experienceForm.activity[0].event == "" &&
        this.experienceForm.activity[0].task == "" &&
        this.experienceForm.activity[0].measure == "" &&
        this.experienceForm.activity[0].result == "" &&
        this.experienceForm.activity[0].reflect == "" &&
        this.experienceForm.experience[0].duty == "" &&
        this.experienceForm.experience[0].task == "" &&
        this.experienceForm.experience[0].operate == "" &&
        this.experienceForm.experience[0].result == "" &&
        this.experienceForm.experience[0].finish == "" &&
        this.experienceForm.experience[0].gain == ""
      ) {
        return;
      }

      if (JSON.parse(sessionStorage.getItem("uuid")) == undefined) {
        let uuid = this.getUuid();
        sessionStorage.setItem("uuid", JSON.stringify(uuid));
      }
      this.experienceForm.uuid = JSON.parse(sessionStorage.getItem("uuid"));
      this.experienceForm.username = JSON.parse(
        sessionStorage.getItem("userInfo")
      ).username;
      this.experienceForm.id = JSON.parse(
        sessionStorage.getItem("userInfo")
      ).id;

      const { data: res } = await request.post(
        "experience",
        this.experienceForm
      );
      if (res.code !== 200) {
        return;
      }

      this.five();
      if (a) {
        this.activeName = "5";
      }
    },
    // 择校意向
    async schoolCareer(s) {
      // if (
      //   this.schoolForm.specialist[0].specialist == "" &&
      //   this.schoolForm.specialist[0].selectSchool == "" &&
      //   this.schoolForm.sch2 == "" &&
      //   this.schoolForm.sch3 == ""
      // ) {
      //   return;
      // }

      if (JSON.parse(sessionStorage.getItem("uuid")) == undefined) {
        let uuid = this.getUuid();
        sessionStorage.setItem("uuid", JSON.stringify(uuid));
      }
      this.schoolForm.uuid = JSON.parse(sessionStorage.getItem("uuid"));
      this.schoolForm.username = JSON.parse(
        sessionStorage.getItem("userInfo")
      ).username;
      this.schoolForm.id = JSON.parse(sessionStorage.getItem("userInfo")).id;

      const { data: res } = await request.post("school", this.schoolForm);
      if (res.code !== 200) {
        return;
      }

      if (s) {
        this.activeName = "6";
        this.six(this.tabName);
      }
    },

    // 职业规划
    async addCareer(info) {
      if (info == "a") {
        if (JSON.parse(sessionStorage.getItem("uuid")) == undefined) {
          let uuid = this.getUuid();
          sessionStorage.setItem("uuid", JSON.stringify(uuid));
        }
        this.careerForm.uuid = JSON.parse(sessionStorage.getItem("uuid"));

        const { data: res } = await request.post("career", this.careerForm);
        if (res.code !== 200) {
          return;
        }
      } else {
        if (
          this.careerForm.firstcareerspecialist[0].plan == "" &&
          this.careerForm.firstcareerspecialist[0].firstcareerspecialist ==
            "" &&
          this.careerForm.firstcareerspecialist[0].jobs == "" &&
          this.careerForm.firstcareerspecialist[0].company == "" &&
          this.careerForm.firstcareerspecialist[0].company1 == "" &&
          this.careerForm.firstcareerspecialist[0].target == "" &&
          this.careerForm.firstcareerspecialist[0].CourseLink[0].course == "" &&
          this.careerForm.firstcareerspecialist[0].CourseLink[0].link == ""
        ) {
          return false;
        }

        if (JSON.parse(sessionStorage.getItem("uuid")) == undefined) {
          let uuid = this.getUuid();
          sessionStorage.setItem("uuid", JSON.stringify(uuid));
        }
        this.careerForm.uuid = JSON.parse(sessionStorage.getItem("uuid"));

        const { data: res } = await request.post("career", this.careerForm);
        if (res.code !== 200) {
          return;
        }
      }

      this.six(this.tabName);
    },
    //其它
    async Other() {
      if (this.otherForm.other == "") {
        return;
      }
      if (JSON.parse(sessionStorage.getItem("uuid")) == undefined) {
        let uuid = this.getUuid();
        sessionStorage.setItem("uuid", JSON.stringify(uuid));
      }
      this.otherForm.uuid = JSON.parse(sessionStorage.getItem("uuid"));
      const { data: res } = await request.post("other", this.otherForm);
      if (res.code !== 200) {
        return;
      }
    },

    // 删除职业规划
    async delCareer(i) {
      let uuid = JSON.parse(sessionStorage.getItem("uuid"));
      console.log(this.careerForm);
      const { data: res } = await request.delete("career", {
        data: {
          uuid: uuid,
          index: i,
        },
      });
      if (res.code !== 200) {
        return;
      }
    },

    // 清空表单
    clearForm() {
      this.Other();

    
      
      this.infomation = {};
      this.addForm = {};
      this.backgroundForm = {};
      this.experienceForm = {};
      this.careerForm = {};
      this.schoolForm = {};
      this.otherForm = {};
      this.$router.push("/orderinfo");
      this.$confirm("Are you sure to generate ws?", "Tips", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
         
          this.CeleryTask();
        })
        .catch(() => {
          this.$message.info("Cancel");
        });

      let uuid = JSON.parse(sessionStorage.getItem("uuid"));
      let routeUrl = this.$router.resolve({
        path: "/verify/",
        params: { uuid: uuid },
      });
      window.open(routeUrl.href, "_blank");
    },

    //其它
    async CeleryTask() {
      let that = this;
      let uuid = JSON.parse(sessionStorage.getItem("uuid"));
      let username = JSON.parse(sessionStorage.getItem("userInfo")).username;
      console.log(username)
      if (uuid) {
        const { data: res } = await request.get(
          "verifydownload?uuid=" + uuid + "&username=" + username
        );
        if (res.code != 200) {
          return;
        }
      } else {
        return;
      }
    },

    // 出发tabs事件
    handleClick(tab, event) {
      sessionStorage.setItem("currentTab", tab.props.name);
      // console.log('tab',tab.props.name);
      if (tab.props.name == "1") {
        // 触发‘前置信息’事件
        this.first();
      } else if (tab.props.name == "2") {
        // 触发‘’事件
        this.second();
      } else if (tab.props.name == "3") {
        // 触发‘用户管理’事件
        this.third();
      } else if (tab.props.name == "4") {
        // 触发‘用户管理’事件
        this.four();
      } else if (tab.props.name == "5") {
        this.first();
        this.five();
      } else if (tab.props.name == "20") {
        this.getOther();
      } else {
        console.log("tabs", tab.props.name);
        let num = Number(tab.props.name) - 6;
        this.tabName = num;
        this.six(num);
        this.six(num);
        this.tabIndex = num + 1;
      }
    },
    async first() {
      let that = this;
      let uuid = JSON.parse(sessionStorage.getItem("uuid"));
      if (uuid) {
        const { data: res } = await request.get("infomation?uuid=" + uuid);
        if (res.code != 200) {
          return;
        }
        if (res.result == undefined) {
          return;
        }
        that.infomation = res.result;
        // that.school_select = res.select;
      } else {
        return;
      }
    },
    async second() {
      let that = this;
      let uuid = JSON.parse(sessionStorage.getItem("uuid"));
      if (uuid) {
        const { data: res } = await request.get("addmotivation?uuid=" + uuid);
        if (res.code != 200) {
          return;
        }
        if (res.result[0] == undefined) {
          return;
        }
        that.addForm = res.result[0];
      } else {
        return;
      }
    },
    async third() {
      let that = this;
      let uuid = JSON.parse(sessionStorage.getItem("uuid"));
      if (uuid) {
        const { data: res } = await request.get("background?uuid=" + uuid);
        if (res.code != 200) {
          return;
        }
        if (res.result[0] == undefined) {
          return;
        }
        // that.backgroundForm = res.result[0];

        if (res.result[0].academiclist == null) {
          this.backgroundForm.academiclist = this.backgroundForm.academiclist;
        } else {
          this.backgroundForm.academiclist = res.result[0].academiclist;
        }

        if (res.result[0].backlist == null) {
          this.backgroundForm.backlist = this.backgroundForm.backlist;
        } else {
          this.backgroundForm.backlist = res.result[0].backlist;
        }
        this.backgroundForm.back1 = res.result[0].back1;
        this.backgroundForm.study = res.result[0].study;
        this.backgroundForm.academic = res.result[0].academic;
        this.backgroundForm.checked1 = res.result[0].checked1;
        this.backgroundForm.checked4 = res.result[0].checked4;
        this.backgroundForm.checked5 = res.result[0].checked5;
      } else {
        return;
      }
    },
    async four() {
      let that = this;
      let uuid = JSON.parse(sessionStorage.getItem("uuid"));
      if (uuid) {
        const { data: res } = await request.get("experience?uuid=" + uuid);
        if (res.code != 200) {
          return;
        }
        if (res.result[0] == undefined) {
          return;
        }

        if (res.result[0].activity == null) {
          this.experienceForm.activity = this.experienceForm.activity;
        } else {
          this.experienceForm.activity = res.result[0].activity;
        }
        if (res.result[0].experience == null) {
          this.experienceForm.experience = this.experienceForm.experience;
        } else {
          this.experienceForm.experience = res.result[0].experience;
        }

        // that.experienceForm = res.result[0];
      } else {
        return;
      }
    },
    async five() {
      let that = this;
      let uuid = JSON.parse(sessionStorage.getItem("uuid"));
      if (uuid) {
        const { data: res } = await request.get("school?uuid=" + uuid);
        if (res.code != 200) {
          return;
        }

        if (res.result[0] == undefined) {
          return;
        }
        if (res.result[0].specialist == null) {
          this.schoolForm.specialist = this.schoolForm.specialist;
        } else {
          this.schoolForm.specialist = res.result[0].specialist;
          this.specialist_length = this.schoolForm.specialist.length;
        }
        if (res.result[1].info == null) {
          this.schoolForm.info = this.schoolForm.info;
        } else {
          this.schoolForm.info = res.result[1].info;
        }
        console.log("five", res.result[1].info);
        // this.schoolForm.sch2 = res.result[0].sch2;
        // this.schoolForm.sch3 = res.result[0].sch3;
        // this.schoolForm.checked2 = res.result[0].checked2;
        // this.schoolForm.checked3 = res.result[0].checked3;

        this.major_length = res.result[0].specialist.length;
        // this.schoolForm.school_major_link = res.school_major_link
        this.school_select = res.school_major_link;
      } else {
        return;
      }
    },
    async six(num) {
      this.careerForm.school_major_link = [];

      let that = this;
      let uuid = JSON.parse(sessionStorage.getItem("uuid"));
      if (uuid) {
        const { data: res } = await request.get(
          "career?uuid=" + uuid + "&index=" + num
        );
        // const { data: res } = await request.get("career?uuid=" + uuid);
        if (res.code != 200) {
          return;
        }
        if (res.school_list) {
          this.careerForm.school_major_link = res.school_list;
        } else {
          this.careerForm.school_major_link = this.careerForm.school_major_link;
        }

        if (res.result[0] == undefined) {
          return;
        }
        if (res.result[0].firstcareerspecialist == null) {
          this.careerForm.firstcareerspecialist =
            this.careerForm.firstcareerspecialist;
        } else {
          this.careerForm.firstcareerspecialist =
            res.result[0].firstcareerspecialist;
        }
      } else {
        return;
      }
    },

    async getOther() {
      let that = this;
      let uuid = JSON.parse(sessionStorage.getItem("uuid"));
      if (uuid) {
        const { data: res } = await request.get("other?uuid=" + uuid);
        if (res.code != 200) {
          return;
        }
        if (res.result[0] == undefined) {
          return;
        }
        that.otherForm = res.result[0];
      } else {
        return;
      }
    },
  },
};
</script>


<style scoped>
</style>

