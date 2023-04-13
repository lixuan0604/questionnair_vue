<template>
  <h2>信息校验</h2>

  <el-form :inline="true">
    <el-row style="margin-top: 2rem">
      <el-form-item label="申请学校/专业/链接"> </el-form-item>
      <el-checkbox
        label="确认"
        size="large"
        v-model="info_verify.school_link_check"
        style="margin-left: 1rem"
      />
    </el-row>
    <el-row>
      <el-input
        :rows="2"
        type="textarea"
        style="width: 60rem"
        v-model="info_verify.school_link"
      />
    </el-row>

    <el-row style="margin-top: 2rem">
      <el-form-item label="学生性别/姓名（rl）"> </el-form-item>
      <el-checkbox
        label="确认"
        size="large"
        v-model="info_verify.sex_name_check"
        style="margin-left: 1rem"
      />
    </el-row>
    <el-row>
      <el-input
        :rows="2"
        type="textarea"
        style="width: 60rem"
        v-model="info_verify.sex_name"
      />
    </el-row>

    <el-row style="margin-top: 2rem">
      <el-form-item label="文书要求"> </el-form-item>
      <el-checkbox
        label="确认"
        size="large"
        v-model="info_verify.paperwork_check"
        style="margin-left: 1rem"
      />
    </el-row>
    <el-row>
      <el-input
        :rows="2"
        type="textarea"
        style="width: 60rem"
        v-model="info_verify.paperwork"
      />
    </el-row>

    <el-row style="margin-top: 2rem">
      <el-form-item label="成绩单"> </el-form-item>
      <el-checkbox
        label="确认"
        size="large"
        v-model="info_verify.transcript_check"
        style="margin-left: 1rem"
      />
    </el-row>
    <el-row>
      <el-input
        :rows="2"
        type="textarea"
        style="width: 60rem"
        v-model="info_verify.transcript"
      />
    </el-row>

    <h2>信息补充</h2>

    <h4>申请动机</h4>
    <el-row style="margin-top: 2rem">
      <el-form-item
        label="是否有具体的兴趣点，比如学术兴趣点或者是一个工作/社会经历引起的学术兴趣、热门事件，该事件对你的目标专业有何影响"
      >
      </el-form-item>
      <el-checkbox
        label="确认"
        size="large"
        v-model="info_verify.motivation_check"
        style="margin-left: 1rem"
      />
    </el-row>
    <el-row>
      <el-input
        :rows="2"
        type="textarea"
        style="width: 60rem"
        v-model="info_verify.motivation"
      />
    </el-row>

    <h4>学术背景</h4>
    <el-row style="margin-top: 2rem">
      <el-form-item label="补充和申请专业相关的课程，研究项目, 课件等">
      </el-form-item>
      <el-checkbox
        label="确认"
        size="large"
        v-model="info_verify.background_check"
        style="margin-left: 1rem"
      />
    </el-row>
    <el-row>
      <el-input
        :rows="2"
        type="textarea"
        style="width: 60rem"
        v-model="info_verify.background"
      />
    </el-row>

    <el-row style="margin-top: 2rem">
      <el-form-item
        label="具体阐述相关的项目中遇到的困难，如何克服或者如何进行研究的。重点在研究方法、分析手段、协作策略及研究成果"
      >
      </el-form-item>
      <el-checkbox
        label="确认"
        size="large"
        v-model="info_verify.background_result_check"
        style="margin-left: 1rem"
      />
    </el-row>
    <el-row>
      <el-input
        :rows="2"
        type="textarea"
        style="width: 60rem"
        v-model="info_verify.background_result"
      />
    </el-row>

    <h4>工作经历</h4>
    <el-row style="margin-top: 2rem">
      <el-form-item
        label="具体补充工作经历/实习中碰到的能体现专业能力的冲突性事件及解决方案"
      >
      </el-form-item>
      <el-checkbox
        label="确认"
        size="large"
        v-model="info_verify.experience_check"
        style="margin-left: 1rem"
      />
    </el-row>
    <el-row>
      <el-input
        :rows="2"
        type="textarea"
        style="width: 60rem"
        v-model="info_verify.experience"
      />
    </el-row>

    <h4>职业规划</h4>
    <el-row style="margin-top: 2rem">
      <el-form-item label="请具体说明各细分专业的职业规划和从事的工作">
      </el-form-item>
      <el-checkbox
        label="确认"
        size="large"
        v-model="info_verify.career_check"
        style="margin-left: 1rem"
      />
    </el-row>
    <el-row>
      <el-input
        :rows="2"
        type="textarea"
        style="width: 60rem"
        v-model="info_verify.career"
      />
    </el-row>

    <h4>申请学科</h4>
    <el-row style="margin-top: 2rem">
      <el-form-item label="你对该课程有无感兴趣的分支、课程、教授">
      </el-form-item>
      <el-checkbox
        label="确认"
        size="large"
        v-model="info_verify.professor_check"
        style="margin-left: 1rem"
      />
    </el-row>
    <el-row>
      <el-input
        :rows="2"
        type="textarea"
        style="width: 60rem"
        v-model="info_verify.professor"
      />
    </el-row>

    <el-row style="margin-top: 2rem">
      <el-form-item label="需要联系各细分专业补充申请该学校及专业的原因">
      </el-form-item>
      <el-checkbox
        label="确认"
        size="large"
        v-model="info_verify.reason_check"
        style="margin-left: 1rem"
      />
    </el-row>
    <el-row>
      <el-input
        :rows="2"
        type="textarea"
        style="width: 60rem"
        v-model="info_verify.reason"
      />
    </el-row>

    <el-row style="margin-top: 2rem">
      <el-form-item label="结合职业规划来阐述申请动机"> </el-form-item>
      <el-checkbox
        label="确认"
        size="large"
        v-model="info_verify.moti_check"
        style="margin-left: 1rem"
      />
    </el-row>
    <el-row>
      <el-input
        :rows="2"
        type="textarea"
        style="width: 60rem"
        v-model="info_verify.moti"
      />
    </el-row>

    <el-row style="margin-top: 2rem">
      <el-form-item label="如果是转专业的话，请补充转专业的原因及目的">
      </el-form-item>
      <el-checkbox
        label="确认"
        size="large"
        v-model="info_verify.purpose_check"
        style="margin-left: 1rem"
      />
    </el-row>
    <el-row>
      <el-input
        :rows="2"
        type="textarea"
        style="width: 60rem"
        v-model="info_verify.purpose"
      />
    </el-row>

    <h4>文书框架</h4>
    <el-row style="margin-top: 2rem">
      <el-form-item label="有无文书整体架构的思路/建议"> </el-form-item>
      <el-checkbox
        label="确认"
        size="large"
        v-model="info_verify.advice_check"
        style="margin-left: 1rem"
      />
    </el-row>
    <el-row>
      <el-input
        :rows="2"
        type="textarea"
        style="width: 60rem"
        v-model="info_verify.advice"
      />
    </el-row>

    <el-row style="margin-top: 2rem">
      <el-form-item label="有无具体素材/想法想要在素材表里突出呈现的">
      </el-form-item>
      <el-checkbox
        label="确认"
        size="large"
        v-model="info_verify.present_check"
        style="margin-left: 1rem"
      />
    </el-row>
    <el-row>
      <el-input
        :rows="2"
        type="textarea"
        style="width: 60rem"
        v-model="info_verify.present"
      />
    </el-row>

    <h4>其他</h4>
    <el-row style="margin-top: 2rem">
      <el-form-item label="需要学生补充的细节信息"> </el-form-item>
      <el-checkbox
        label="确认"
        size="large"
        v-model="info_verify.other_check"
        style="margin-left: 1rem"
      />
    </el-row>
    <el-row>
      <el-input
        :rows="2"
        type="textarea"
        style="width: 60rem"
        v-model="info_verify.other"
      />
    </el-row>
    <el-row>
      <el-form-item>
        <el-button
          style="width: 100%; margin-bottom: 2rem; margin-top: 2rem"
          type="primary"
          @click="verify()"
          >完成
        </el-button>
      </el-form-item>
    </el-row>
  </el-form>
</template>


<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      info_verify: {
        school_link: "",
        school_link_check: false,

        sex_name: "",
        sex_name_check: false,

        paperwork: "",
        paperwork_check: false,

        transcript: "",
        transcript_check: false,

        motivation: "",
        motivation_check: false,

        background: "",
        background_check: false,
        background_result: "",
        background_result_check: false,

        experience: "",
        experience_check: false,

        career: "",
        career_check: false,

        professor: "",
        professor_check: false,
        reason: "",
        reason_check: false,
        moti: "",
        moti_check: false,
        purpose: "",
        purpose_check: false,

        advice: "",
        advice_check: false,

        present: "",
        present_check: false,

        other: "",
        other_check: false,
        uuid : '',
        status:false
      },
    };
  },
  mounted() {
    // let uuid = this.$route.params.uuid;
    // console.log(uuid)
    // this.info_verify.uuid = uuid
    // this.getdetailList(uuid);
    this.info_verify.uuid = JSON.parse(sessionStorage.getItem("uuid"))
  },
  created(){
    this.getVerify()
  },
  methods: {
    // getdetailList(uuid){

    // }
    async verify() {
      if (
        this.info_verify.school_link_check &&
        this.info_verify.sex_name_check &&
        this.info_verify.paperwork_check &&
        this.info_verify.transcript_check &&
        this.info_verify.motivation_check &&
        this.info_verify.background_check &&
        this.info_verify.background_result_check &&
        this.info_verify.experience_check &&
        this.info_verify.career_check &&
        this.info_verify.professor_check &&
        this.info_verify.reason_check &&
        this.info_verify.moti_check &&
        this.info_verify.purpose_check &&
        this.info_verify.advice_check &&
        this.info_verify.present_check &&
        this.info_verify.other_check
      ) {
        // window.close();
        this.info_verify.status = true
      } else {
        this.info_verify.status = false
      }
      const { data: res } = await request.post("verify", this.info_verify);
        if (res.code !== 200) {
          return;
        }
        window.close()
    },
    async getVerify(){
      let uuid = JSON.parse(sessionStorage.getItem("uuid"));
      const { data: res } = await request.get("verify?uuid="+uuid);
        if (res.code !== 200) {
          return;
        }
        this.info_verify = res.result[0].info_verify

    }
  },
};
</script>
