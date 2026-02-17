import { Component } from "react";
import { Field, FieldGroup } from "@/components/ui/field";
import { Form } from "react-final-form";
import { Button } from "@/components/ui/button";
import { initialLogin, validateLogin, type LoginForm as ZodForm } from "@repo/schema";
import { InputFF } from "@/components/finalform/Input";
import type { FormApi } from "final-form";
import { CheckboxFF } from "@/components/finalform/Checkbox";
import { HugeiconsIcon } from "@hugeicons/react";
import { Login02Icon } from "@hugeicons/core-free-icons";
import { api, Rest } from "@/lib/api";

type Props = {
  setTab: (v: number) => void;
};

class LoginForm extends Component<Props> {
  formApi: FormApi<ZodForm> | null = null;

  private saveApi = async (data: ZodForm) => {
    try {
      console.log("save param =>", data);
      const res = await Rest(api.login.$post({ json: data }));
      console.log("save api =>", res);
      if (res.status === "ok") this.props.setTab(2);
    } catch (error) {
      console.error("saveApi err =>", error);
    }
  };

  private onSubmit = (values: ZodForm) => {
    this.saveApi(values);
  };

  render() {
    return (
      <div>
        <Form<ZodForm>
          initialValues={initialLogin}
          onSubmit={this.onSubmit}
          validate={validateLogin}
          subscription={{ submitting: true, pristine: false }}
        >
          {({ handleSubmit, pristine, form }) => {
            if (!this.formApi) this.formApi = form;
            return (
              <form onSubmit={handleSubmit}>
                <FieldGroup>
                  <div className="flex flex-col gap-4">
                    <InputFF name="username" label="Username" placeholder="ระบุชื่อผู้ใช้" autoComplete="username" />
                    <InputFF
                      name="password"
                      label="Password"
                      placeholder="ระบุรหัสผ่าน"
                      type="password"
                      autoComplete="current-password"
                    />
                    <CheckboxFF name="remember" label="Remember me" />
                  </div>

                  <Field orientation="horizontal" className="flex flex-row justify-center">
                    <Button variant="default" type="submit" disabled={pristine} className="w-full">
                      Login
                      <HugeiconsIcon icon={Login02Icon} />
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            );
          }}
        </Form>
      </div>
    );
  }
}

export default LoginForm;
