import { Component } from "react";
import { Field, FieldGroup } from "@/components/ui/field";
import { Form } from "react-final-form";
import { Button } from "@/components/ui/button";
import { initial, validateUserInfo, type UserInfoForm as UserForm } from "@repo/schema";
import type { AutocompleteItemsFF, SelectItemFF } from "@/types/ui";
import { InputFF } from "@/components/finalform/Input";
import { SelectFF } from "@/components/finalform/Select";
import { AutocompleteFF } from "@/components/finalform/Autocomplete";
import { calculator } from "./decorators";
import type { FormApi } from "final-form";
import { api, Rest } from "@/lib/api";
import { TextareaFF } from "@/components/finalform/Textarea";

type Props = {
  setTab: (v: number) => void;
};

class UserInfoForm extends Component<Props> {
  formApi: FormApi<UserForm> | null = null;

  async componentDidMount() {
    await this.getApiData();
  }

  private getApiData = async () => {
    try {
      const res = await Rest(api.userInfo.$get());
      console.log("res =>", res);
      if (res.status === "ok") {
        const apiData = res.data;
        console.log("apiData =>", apiData);
        if (this.formApi) {
          this.formApi.initialize(apiData);
        }
      }
    } catch (error) {
      console.error("api err =>", error);
    }
  };

  private saveApi = async (data: UserForm) => {
    try {
      const res = await Rest(api.userInfo.$post({ json: data }));
      console.log("save api =>", res);
      if (res.status === "ok") {
        this.formApi?.initialize(res.data);
      }
    } catch (error) {
      console.error("saveApi err =>", error);
    }
  };

  private onSubmit = (values: UserForm) => {
    console.log("Submitted values:", values);
    this.saveApi(values);
  };

  render() {
    const frameworks: AutocompleteItemsFF[] = [
      { label: "Next.js", value: "next" },
      { label: "SvelteKit", value: "sveltekit" },
      { label: "Nuxt.js", value: "nuxt" },
      { label: "Remix", value: "remix" },
      { label: "Astro", value: "astro" },
    ];
    const roleItems: SelectItemFF[] = [
      { label: "Developer", value: "developer" },
      { label: "Designer", value: "designer" },
      { label: "Manager", value: "manager" },
      { label: "Other", value: "other" },
    ];

    return (
      <Form<UserForm>
        initialValues={initial}
        onSubmit={this.onSubmit}
        validate={validateUserInfo}
        decorators={[calculator]}
        subscription={{ submitting: true, pristine: true }}
      >
        {({ handleSubmit, pristine, form }) => {
          if (!this.formApi) this.formApi = form;
          return (
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <div className="grid grid-cols-2 gap-4">
                  <InputFF
                    name="email"
                    label="Email Address"
                    placeholder="Email"
                    isRequired
                    subscription={{ value: true }}
                  />
                  <SelectFF name="role" label="Role" items={roleItems} placeholder="Select Role" isRequired />
                </div>
                <AutocompleteFF
                  name="framework"
                  label="Framework"
                  items={frameworks}
                  isRequired
                  placeholder="เลือก Framework"
                />
                <TextareaFF name="comment" label="Comment" placeholder="Description" />
                <Field orientation="horizontal">
                  <Button variant="default" type="submit" disabled={pristine}>
                    Submit
                  </Button>
                  <Button variant="outline" type="button" onClick={() => this.props.setTab(1)}>
                    Cancel
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          );
        }}
      </Form>
    );
  }
}

export default UserInfoForm;
